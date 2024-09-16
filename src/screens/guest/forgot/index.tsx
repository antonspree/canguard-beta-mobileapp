import * as React from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { forgotPass } from "@/actions/auth";
import Text from "@/elements/Text";
import ProfileInput from "@/components/ProfileInput";
import { ForgotPasswordFormDataType } from "@/types/form";

const ForgotPasswordScreen = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormDataType>();

  const onSubmit = async (data: ForgotPasswordFormDataType) => {
    const result = await forgotPass({ ...data });

    if (result.success) {
      Toast.show({
        type: "success",
        text2: result.msg,
      });
    } else {
      Toast.show({
        type: "error",
        text2: result.msg,
      });
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center space-y-5 px-5">
      <View className="flex justify-center items-center space-y-2">
        <Image
          className="w-48 h-12"
          placeholder="logo"
          source={require("@/assets/images/logo.png")}
        />
        <Text className="text-center font-bold text-3xl">
          Passwort zurücksetzen
        </Text>
        <Text
          variant="bodySmall"
          className="text-center font-semibold text-sm text-[#919191]"
        >
          Du hast Dein Passwort vergessen? Keine Sorge! Gib deine E-Mail ein und
          wir senden Dir eine Mail zum zurücksetzen deines Passworts
        </Text>
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
                label="E-Mail Adresse*"
                onChange={onChange}
              />
            </View>
          )}
        />
      </View>
      <View className="w-full">
        <Pressable
          className="w-full flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-base font-bold text-white">
            Passwort zurücksetzen
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
