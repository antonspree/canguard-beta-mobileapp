import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { Image } from "expo-image";
import ProfileInput from "@/components/ProfileInput";
import { signIn } from "@/actions/auth";
import { saveData } from "@/lib/storage";
import { SignInFormDataType } from "@/types/form";
import Toast from "react-native-toast-message";
import { getData } from "@/actions/user";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormDataType>();

  const onSubmit = async (data: SignInFormDataType) => {
    const result = await signIn(data);

    if (result.success) {
      await saveData("token", result.token);
      Toast.show({
        type: "success",
        text1: "Glückwunsch",
        text2: result.msg,
      });

      const userData = await getData();

      if (userData && userData.success) {
        dispatch(userActions.setUser({ user: userData.user }));
        dispatch(clubActions.setClub({ club: userData.club }));
        dispatch(membersActions.setMembers({ members: userData.members }));
        dispatch(
          membershipActions.setMembership({ membership: userData.membership })
        );
      }

      if (userData.user.club) {
        router.push("/(app)/(dashboard)");
      } else {
        router.push("/(app)/(noclub)");
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error de inicio de sesion",
        text2: result.msg,
      });
    }
  };

  return (
    <View className="w-full h-full flex justify-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          className="w-12 h-12"
          placeholder="logo"
          source={require("../../../assets/images/logo.png")}
        />
        <Text className="font-bold text-3xl">Einloggen</Text>
        <View className="flex flex-row items-center">
          <Text className="font-semibold text-base text-[#919191]">
            {"oder kostenlos "}
          </Text>
          <Pressable onPress={() => router.push("/(guest)/signup")}>
            <Text className="font-semibold text-base text-[#19A873] underline">
              registrieren
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="w-full">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View>
              <ProfileInput
                value={value}
                placeholder="E-Mail Adresse*"
                onChange={onChange}
              />
            </View>
          )}
        />
        {errors.email && (
          <Text className="m-1 text-xs text-red-500">
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
              <ProfileInput
                value={value}
                type="password"
                placeholder="Passwort*"
                onChange={onChange}
              />
            </View>
          )}
        />
        {errors.password && (
          <Text className="m-1 text-xs text-red-500">
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
      </View>
      <Pressable onPress={() => router.push("/(guest)/forgot")}>
        <Text className="text-sm text-[#919191]">Passwort vergessen?</Text>
      </Pressable>
      <Pressable
        className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-base font-bold text-white">Einloggen</Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;
