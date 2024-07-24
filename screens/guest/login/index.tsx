import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { signIn } from "@/actions/auth";
import { saveData } from "@/libs/storage";
import { SignInFormDataType } from "@/types/form";
import ProfileInput from "@/components/ProfileInput";

const LoginScreen: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormDataType>();

  const onSubmit = async (data: SignInFormDataType) => {
    const result = await signIn(data);

    if (result.success) {
      await saveData("token", result.token);
      Toast.show({
        type: "success",
        text1: "Glückwunsch",
        text2: result.msg,
      });

      router.push("/dashboard");
    } else {
      Toast.show({
        type: "error",
        text1: "Error de inicio de sesion",
        text2: result.msg,
      });
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image
          style={{ width: 48, height: 48 }}
          placeholder="logo"
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Einloggen</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#919191" }}>
            {"oder kostenlos "}
          </Text>
          <Pressable onPress={() => router.push("/guest/signup")}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: "#19A873",
                textDecorationLine: "underline",
              }}
            >
              registrieren
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%" }}>
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
          <Text style={{ margin: 4, fontSize: 12, color: "red" }}>
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginTop: 16 }}>
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
          <Text style={{ margin: 4, fontSize: 12, color: "red" }}>
            Dieses Feld muss ausgefüllt werden.
          </Text>
        )}
      </View>
      <Pressable onPress={() => router.push("/guest/forgot")}>
        <Text style={{ fontSize: 14, color: "#919191" }}>
          Passwort vergessen?
        </Text>
      </Pressable>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: "#19A873",
          borderRadius: 6,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          Einloggen
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
