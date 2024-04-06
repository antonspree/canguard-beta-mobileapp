import React, { useState, useEffect } from "react";

import { router } from "expo-router";
import Checkbox from "expo-checkbox";

import { Text, View, Image, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";

import { Button, AuthInput } from "@/components";

import { signIn } from "@/actions/auth";

import { clearData, loadData, saveData } from "@/utils/storage";

import { SignInFormDataType } from "@/types/auth";

import LogoImage from "@/assets/images/logo.png";

const SignInScreen: React.FC = () => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<SignInFormDataType>();

  useEffect(() => {
    (async () => {
      const savedData = await loadData("sign");

      if (savedData) {
        setChecked(true);

        Object.entries(JSON.parse(savedData)).forEach(([key, value]) => {
          setValue(key as keyof SignInFormDataType, value as string);
        });
      }
    })();
  }, []);

  const onRememberMe = async () => {
    if (isChecked) {
      await clearData("sign");
    }

    setChecked((prev) => !prev);
  };

  const onSubmit = async (data: SignInFormDataType) => {
    // if (!isChecked) {
    //   const formData = getValues();
    //   console.log(formData)
    //   await saveData("sign", formData);
    // } else {
    //   await clearData("sign");
    // }
    // console.log();
    // const result = await signIn(data);
    // if (result.success) {
    //   await saveData("token", result.token);
    //   router.replace("/(main)/home");
    // }
    router.replace("/(auth)/reset");
  };

  const goSignUp = () => {
    router.replace("/(auth)/signup");
  };

  const goForgot = () => {};

  return (
    <View className="w-full h-full flex justify-center items-center space-y-7 px-5">
      <View className="flex justify-center items-center">
        <Image source={LogoImage} className="w-12 h-12" />
        <Text className="font-bold text-3xl mt-2">Passwort zurücksetzen</Text>
        <View className="flex flex-row items-center mt-3">
          <Text className="text-base text-[#A3A3A3] font-semibold text-center">
            Du hast Dein Passwort vergessen? Keine Sorge! Gib deine E-Mail ein
            und wir senden Dir eine Mail zum zurücksetzen deines Passworts
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
              <AuthInput
                value={value}
                placeholder={"E-Mail Adresse*"}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.email && (
          <Text className="text-xs text-midred m-1 text-red-500">
            Dies muss erforderlich sein.
          </Text>
        )}
      </View>
      <View className="w-full">
        <Pressable
          className={`w-full flex justify-center items-center py-2 rounded-md bg-[#19A873]`}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Passwort zurücksetzen</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInScreen;
