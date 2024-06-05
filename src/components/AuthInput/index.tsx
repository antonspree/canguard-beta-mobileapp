import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { AuthInputProps } from "@/types/component";
import { formatedate, getMaxDate } from "@/lib/function";

const AuthInput: React.FC<AuthInputProps> = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange,
}) => {
  const [isShown, setShown] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
    if (type === "set") {
      const currentDate = selectedDate;

      onChange(currentDate ? currentDate.toISOString() : "");
      setShowPicker((prev) => !prev);
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  return (
    <View className="flex flex-row justify-between items-center w-full py-2 border border-[#EAEAEA] rounded-md">
      {type !== "date" ? (
        <>
          <TextInput
            className="flex-1 px-4 outline-none"
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
      ) : (
        <>
          <Pressable onPress={() => setShowPicker((prev) => !prev)}>
            <TextInput
              className="px-4 outline-none"
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
    </View>
  );
};

export default AuthInput;
