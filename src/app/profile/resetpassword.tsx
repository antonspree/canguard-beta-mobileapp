import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ProfileInput } from "@/components";
import { signIn } from "@/actions/auth";
import { saveData } from "@/lib/storage";
import { SignInFormDataType } from "@/types/form";
import Toast from "react-native-toast-message";
import { Container } from "@/components";

const SingUp: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const result = await signIn(data);

    Toast.show({
      type: "error",
      text1: "Error de inicio de sesion",
      text2: result.msg,
    });
  };

  return (
    <Container>
      <View className="w-full h-full flex justify-center space-y-5 px-5">
        <View className="flex justify-center items-center space-y-2">
          <Image
            className="w-12 h-12"
            placeholder="logo"
            source={require("../../assets/images/logo.png")}
          />
          <Text className="font-bold text-3xl">Passwort zurücksetzen</Text>
        </View>
        <View className="w-full">
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <ProfileInput
                  type="password"
                  value={value}
                  placeholder="Aktuelles Passwort*"
                  onChange={onChange}
                />
              </View>
            )}
          />
          {errors.currentPassword && (
            <Text className="m-1 text-xs text-red-500">
              Dieses Feld muss ausgefüllt werden.
            </Text>
          )}
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View className="mt-4">
                <ProfileInput
                  type="password"
                  value={value}
                  placeholder="Neues Kennwort*"
                  onChange={onChange}
                />
              </View>
            )}
          />
          {errors.newPassword && (
            <Text className="m-1 text-xs text-red-500">
              Dieses Feld muss ausgefüllt werden.
            </Text>
          )}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View className="mt-4">
                <ProfileInput
                  value={value}
                  type="password"
                  placeholder="Bestätige das Passwort*"
                  onChange={onChange}
                />
              </View>
            )}
          />
          {errors.confirmPassword && (
            <Text className="m-1 text-xs text-red-500">
              Dieses Feld muss ausgefüllt werden.
            </Text>
          )}
        </View>
        <Pressable
          className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-base font-bold text-white">Zurücksetzen</Text>
        </Pressable>
        <Pressable
          className="flex justify-center items-center py-2 border border-gray-600 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-base font-bold text-gray-600">Stornieren</Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default SingUp;
