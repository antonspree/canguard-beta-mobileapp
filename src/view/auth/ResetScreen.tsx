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

const ResetScreen: React.FC = () => {
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
    router.replace("/"); // if (!isChecked) {
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
  };

  const goSignUp = () => {
    router.replace("/(auth)/signup");
  };

  const goForgot = () => {};

  return (
    <View className="w-full h-full flex justify-center items-center space-y-7 px-5">
      <View className="flex justify-center items-center">
        <Image source={LogoImage} className="w-12 h-12" />
        <Text className="font-bold text-3xl mt-2">Neues Passwort</Text>
        <View className="flex flex-row items-center mt-3">
          <Text className="text-base text-[#A3A3A3] font-semibold text-center">
            Vergebe ein neues Passwort. Danach kannst Du dich wieder ganz normal
            einloggen.
          </Text>
        </View>
      </View>
      <View className="w-full">
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <View>
              <AuthInput
                value={value}
                type={"password"}
                placeholder={"Passwort*"}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.password && (
          <Text className="text-xs text-midred m-1 text-red-500">
            Dieser muss mindestens 8 Zeichen lang sein.
          </Text>
        )}

        <Controller
          name="password2"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
              <AuthInput
                value={value}
                type={"password"}
                placeholder={"Passwort wiederholen*z"}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.password2 && (
          <Text className="text-xs text-midred m-1 text-red-500">
            Dieser muss mindestens 8 Zeichen lang sein.
          </Text>
        )}
      </View>
      <View className="w-full">
        <Pressable
          className={`w-full flex justify-center items-center py-2 rounded-md bg-[#19A873]`}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Zurücksetzen </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ResetScreen;
