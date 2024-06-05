import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import { AuthInput } from "@/components";
import { signUp } from "@/actions/auth";
import { clearData, loadData } from "@/lib/storage";
import message from "@/lib/message";
import { RegisterFormDataType } from "@/types/auth";

const RegisterScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isChecked, setChecked] = useState<boolean>(false);
  const [showErr, setShowErr] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormDataType>();

  useEffect(() => {
    (async () => {
      const savedData = await loadData("userinfo");

      setUserInfo(savedData);
    })();
  }, []);

  useEffect(() => {
    if (showErr) {
      setShowErr(false);
    }
  }, [isChecked]);

  const onSubmit = async (data: RegisterFormDataType) => {
    if (!isChecked) {
      setShowErr(true);
    } else {
      const result = await signUp({ ...userInfo, ...data });

      message({ message: result.msg });

      if (result.success) {
        await clearData("userinfo");

        router.push("/(auth)/login");
      }
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          source={require("../../assets/images/logo.png")}
          placeholder="logo"
          className="w-12 h-12"
        />
        <Text className="text-center font-bold text-3xl">
          Herzlich Willkommen
          <Text className="text-[#19A873]">{" bei CanGuard!"}</Text>
        </Text>
        <Text className="text-center font-semibold text-[#919191]">
          Bitte vervollständige dein persönliches Profil und bestätige, dass du
          über 18 Jahre alt bist.
        </Text>
      </View>
      <View className="w-full">
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View>
              <AuthInput
                value={value}
                placeholder="Name*"
                onChange={onChange}
              />
            </View>
          )}
        />
        {errors.username && (
          <Text className="text-xs m-1 text-red-500">
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
        <Controller
          name="birth"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
              <AuthInput
                value={value}
                type="date"
                placeholder="jjjj.mm.tt*"
                onChange={onChange}
              />
            </View>
          )}
        />
        {errors.birth && (
          <Text className="text-xs m-1 text-red-500">
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
      </View>
      <View className="w-full flex flex-col">
        <View className="flex flex-row items-center space-x-2">
          <Checkbox
            className="w-3.5 h-3.5"
            value={isChecked}
            onValueChange={() => setChecked((prev) => !prev)}
          />
          <Text className="flex-1 text-sm text-[#919191]">
            Ich bestätige, dass alle Angaben korrekt sind und ich über 18 Jahre
            alt bin.
          </Text>
        </View>
        {showErr && (
          <Text className="text-xs m-1 text-red-500">
            Dieses Feld muss ausgewählt werden.
          </Text>
        )}
      </View>
      <View className="w-full">
        <Pressable
          className="w-full flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-bold text-white">Let's go!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;