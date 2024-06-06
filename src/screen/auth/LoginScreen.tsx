import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ProfileInput } from "@/components";
import { signIn } from "@/actions/auth";
import { saveData } from "@/lib/storage";
import message from "@/lib/message";
import { SignInFormDataType } from "@/types/form";

const LoginScreen: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormDataType>();

  const onSubmit = async (data: SignInFormDataType) => {
    const result = await signIn(data);

    message({ message: result.msg });

    if (result.success) {
      await saveData("token", result.token);

      router.replace("/(main)/home");
    }
  };

  return (
    <View className="w-full h-full flex justify-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          className="w-12 h-12"
          placeholder="logo"
          source={require("../../assets/images/logo.png")}
        />
        <Text className="font-bold text-3xl">Einloggen</Text>
        <View className="flex flex-row items-center">
          <Text className="font-semibold text-base text-[#919191]">oder kostenlos</Text>
          <Text className="font-semibold text-base">{" registrieren"}</Text>
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
      <Pressable onPress={() => router.push("/(auth)/forgot")}>
        <Text className="text-sm text-[#919191]">Passwort vergessen?</Text>
      </Pressable>
      <View className="flex flex-col space-y-4">
        <Pressable
          className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Einloggen</Text>
        </Pressable>
        <View className="flex flex-row justify-end">
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-sm text-[#919191] underline">
              Gehen Sie zur Registrieren
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
