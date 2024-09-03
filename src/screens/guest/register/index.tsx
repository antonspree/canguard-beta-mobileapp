import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { signUp } from "@/actions/auth";
import { clearData, loadData } from "@/lib/storage";
import ProfileInput from "@/components/ProfileInput";
import { RegisterFormDataType } from "@/types/form";
import Text from "@/elements/Text";

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

      Toast.show({
        type: "error",
        text1: "Registro fallido",
        text2: result.msg,
      });

      if (result.success) {
        await clearData("userinfo");

        router.push("/guest/login");
      }
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          source={require("../../../assets/images/logo.png")}
          placeholder="logo"
          className="w-12 h-12"
        />
        <Text className="text-center font-bold text-3xl">
          Herzlich Willkommen
          <Text className="text-[#19A873]">{" bei Canify!"}</Text>
        </Text>
        <Text className="text-center font-semibold text-base text-[#919191]">
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
              <ProfileInput value={value} label="Name*" onChange={onChange} />
            </View>
          )}
        />
        {errors.username && (
          <Text className="m-1 text-xs text-red-500">
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
        <Controller
          name="birth"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-4">
              <ProfileInput
                value={value}
                type="date"
                label="tt.mm.jjjj*"
                onChange={onChange}
              />
            </View>
          )}
        />
        {errors.birth && (
          <Text className="m-1 text-xs text-red-500">
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
          <Text className="m-1 text-xs text-red-500">
            Dieses Feld muss ausgewählt werden.
          </Text>
        )}
      </View>
      <View className="w-full">
        <Pressable
          className="w-full flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-base font-bold text-white">Let's go!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
