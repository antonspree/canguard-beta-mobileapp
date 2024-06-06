import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ProfileInput } from "@/components";
import { saveData } from "@/lib/storage";
import { SignUpFormDataType } from "@/types/form";

const SignUpScreen: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormDataType>();

  const onSubmit = async (data: SignUpFormDataType) => {
    await saveData("userinfo", data);

    router.push("/(auth)/register");
  };

  return (
    <View className="w-full h-full flex justify-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          className="w-12 h-12"
          placeholder="logo"
          source={require("../../assets/images/logo.png")}
        />
        <Text className="font-bold text-3xl">Registrieren</Text>
        <View className="flex flex-row items-center">
          <Text className="font-semibold text-center text-base text-[#919191]">
            Erstelle jetzt deinen CanGuard Account. Wenn du dich bereits
            registriert hast, kannst du dich ganz normal
            <Text className="text-black">{" einloggen."}</Text>
          </Text>
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
      <View>
        <Text className="w-full text-xs text-[#919191] text-center">
          Mit der Bestätigung des Formulars, stimme ich den
          <Text className="underline">
            {" Allgemeinen Geschäftsbedingungen,"}
          </Text>
          {" sowie den"}
          <Text className="underline">{" Datenschutzrichtlinien"}</Text>
          {" zu."}
        </Text>
      </View>
      <View className="flex flex-col space-y-4">
        <Pressable
          className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Registrieren</Text>
        </Pressable>
        <View className="flex flex-row justify-end">
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text className="text-sm text-[#919191] underline">
              Ich habe bereits einen Account.
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
