import React, { useEffect } from "react";
import { View, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { signIn } from "@/actions/auth";
import { getData } from "@/actions/user";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";
import ProfileInput from "@/components/ProfileInput";
import { saveData } from "@/lib/storage";
import { SignInFormDataType } from "@/types/form";
import Text from "@/elements/Text";

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormDataType>();

  const onSubmit = async (data: SignInFormDataType) => {
    try {
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
          router.push("/(app)/(dashboard)/home");
        } else {
          router.push("/(app)/(noclub)");
        }
      } else {
        if (result.msg) {
          Toast.show({
            type: "error",
            text1: "Error de inicio de sesion",
            text2: result.msg,
          });
        } else {
          Toast.show({
            type: "error",
            text2: "Error de conexión de red",
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text2: "Network error",
      });
    }
  };

  return (
    <View className="w-full h-full flex justify-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          className="w-48 h-12"
          placeholder="logo"
          source={require("@/assets/images/logo.png")}
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
        <View>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <ProfileInput
                  value={value}
                  label="E-Mail Adresse*"
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
        </View>
        <View>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View className="mt-4">
                <ProfileInput
                  value={value}
                  type="password"
                  label="Passwort*"
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
      </View>
      <Pressable onPress={() => router.push("/(guest)/forgot")}>
        <Text className="text-sm text-[#919191]">Passwort vergessen?</Text>
      </Pressable>
      <Button
        mode="contained"
        buttonColor="#19A873"
        onPress={handleSubmit(onSubmit)}
        className="rounded-md"
      >
        <Text className="font-bold text-center text-base text-white">
          Starten
        </Text>
      </Button>
    </View>
  );
};

export default SignInScreen;
