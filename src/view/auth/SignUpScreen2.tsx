import React, { useState, useEffect } from "react";

import { router } from "expo-router";

import { Text, View, Image, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";

import { AuthInput } from "@/components";

import { signIn } from "@/actions/auth";

import { clearData, loadData, saveData } from "@/utils/storage";

import { SignInFormDataType } from "@/types/auth";

import LogoImage from "@/assets/images/logo.png";
import Checkbox from "expo-checkbox";

const SignUpScreen2: React.FC = () => {
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

    console.log();
    goSignIn();

    // const result = await signIn(data);

    // if (result.success) {
    //   await saveData("token", result.token);

    //   router.replace("/(main)/home");
    // }
  };

  const goSignIn = () => {
    router.replace("/(auth)/signin");
  };

  const goForgot = () => {};

  return (
    <View className="w-full h-full flex justify-center items-center space-y-7 px-5">
      <View className="flex justify-center items-center">
        <Image source={LogoImage} className="w-12 h-12" />
        <Text className="font-bold text-3xl mt-2 text-center">
          Herzlich Willkommen{" "}
          <Text className="text-[#19A873]">bei CanGuard!</Text>
        </Text>
        <View className="flex flex-row items-center mt-3 px-2">
          <Text className="text-base text-center text-[#A3A3A3] font-semibold">
            Bitte vervollständige dein persönliches Profil und bestätige, dass
            du über 18 Jahre alt bist.
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
                placeholder={"Name*"}
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
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
              <AuthInput
                value={value}
                placeholder={"tt.mm.jjjj*"}
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
      </View>
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Checkbox value={isChecked} onValueChange={onRememberMe} />
          <Text className="flex-1 text-xs text-[#A3A3A3] ml-2">
            Ich bestätige, dass alle Angaben korrekt sind und ich über 18 Jahre
            alt bin.
          </Text>
        </View>
      </View>
      <View className="w-full">
        <Pressable
          className={`w-full flex justify-center items-center py-2 rounded-md bg-[#19A873]`}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Let’s go!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen2;
