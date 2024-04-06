import React, { useState, useEffect } from "react";

import { router } from "expo-router";

import { Text, View, Image, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";

import { AuthInput } from "@/components";

import { signIn } from "@/actions/auth";

import { clearData, loadData, saveData } from "@/utils/storage";

import { SignInFormDataType } from "@/types/auth";

import LogoImage from "@/assets/images/logo.png";

const SignUpScreen: React.FC = () => {
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

    goSignUp2();
    // console.log();

    // const result = await signIn(data);

    // if (result.success) {
    //   await saveData("token", result.token);

    //   router.replace("/(main)/home");
    // }
  };

  const goSignIn = () => {
    router.replace("/(auth)/signin");
  };

  const goSignUp2 = () => {
    router.replace("/(auth)/signup2");
  };

  return (
    <View className="w-full h-full flex justify-center items-center space-y-7 px-5">
      <View className="flex justify-center items-center">
        <Image source={LogoImage} className="w-12 h-12" />
        <Text className="font-bold text-3xl mt-2">Registrieren</Text>
        <View className="flex flex-row items-center mt-3">
          <Text className="text-base text-center text-[#A3A3A3] font-semibold">
            Erstelle jetzt deinen CanGuard Account. Wenn du dich bereits
            registriert hast, kannst du dich ganz normal
            <Text className="text-base font-semibold text-black">
              {" einloggen."}
            </Text>
          </Text>
        </View>
      </View>
      <View>
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
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
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
      </View>
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="w-full text-xs text-[#A3A3A3] text-center">
          Mit der Bestätigung des Formulars, stimme ich den{" "}
          <Text className="underline">Allgemeinen Geschäftsbedingungen</Text>,
          sowie den <Text className="underline">Datenschutzrichtlinien</Text>{" "}
          zu.
        </Text>
      </View>
      <View className="w-full">
        <Pressable
          className={`w-full flex justify-center items-center py-2 rounded-md bg-[#19A873]`}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Registrieren</Text>
        </Pressable>
        <View className="w-full flex flex-row justify-end mt-4">
          <Pressable onPress={goSignIn}>
            <Text className="text-sm text-[#A3A3A3] underline">
              Ich habe bereits einen Account.
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
