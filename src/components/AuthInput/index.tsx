import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthInputProps } from "@/types/component";

const AuthInput: React.FC<AuthInputProps> = ({
  type = "text",
  value = "",
  placeholder = "",
  onChangeText,
}) => {
  const [isShown, setShown] = useState(false);

  return (
    <View className="flex flex-row justify-between items-center w-full py-2 border border-[#EAEAEA] rounded-md bg-input-light dark:bg-input-dark">
      <TextInput
        className="flex-1 text-base outline-none px-4"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={type === "password" && !isShown}
      />
      {type === "password" && (
        <Pressable
          className="pr-3"
          onPress={() => {
            setShown((prev) => !prev);
          }}
        >
          {isShown ? (
            <FontAwesome name="eye" size={20} color="#777777" />
          ) : (
            <FontAwesome name="eye-slash" size={20} color="#777777" />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default AuthInput;
