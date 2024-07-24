import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ProfileInputProps } from "@/types/component";
import { formatedate, getMaxDate } from "@/libs/function";

const ProfileInput: React.FC<ProfileInputProps> = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange,
}) => {
  const [isShown, setShown] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = ({ type }: any, selectedDate?: Date) => {
    if (type === "set") {
      const currentDate = selectedDate;

      onChange(currentDate ? currentDate.toISOString() : "");
      setShowPicker((prev) => !prev);
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  return (
    <View className="flex flex-row justify-between items-center w-full py-1.5 border border-[#EAEAEA] rounded-md">
      {type === "text" && (
        <TextInput
          className="px-2 outline-none"
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      )}
      {type === "password" && (
        <>
          <TextInput
            className="flex-1 px-2 outline-none"
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
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
        </>
      )}
      {type === "date" && (
        <>
          <Pressable
            className="w-full"
            onPress={() => setShowPicker((prev) => !prev)}
          >
            <TextInput
              className="px-2 outline-none"
              value={value === "" ? value : formatedate(value)}
              placeholder={placeholder}
              editable={false}
              onPressIn={() => setShowPicker((prev) => !prev)}
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              mode="date"
              value={value === "" ? getMaxDate() : new Date(value)}
              minimumDate={new Date("1900-01-01")}
              maximumDate={getMaxDate()}
              onChange={onChangeDate}
            />
          )}
        </>
      )}
      {type === "textarea" && (
        <TextInput
          className="px-2 outline-none"
          style={{ textAlignVertical: "top" }}
          multiline
          numberOfLines={5}
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      )}
    </View>
  );
};

export default ProfileInput;
