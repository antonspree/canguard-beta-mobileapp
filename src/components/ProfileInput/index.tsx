import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatedate, getMaxDate } from "@/lib/function";
import Text from "@/elements/Text";
import { ProfileInputProps } from "@/types/component";
import { useTheme } from "@/hooks/useThemeProvider";

const ProfileInput: React.FC<ProfileInputProps> = ({
  type = "text",
  value = "",
  label,
  onChange,
  numberOfLines,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isShown, setShown] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);

  const onChangeDate = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
    if (type === "set") {
      const currentDate = selectedDate;

      onChange(currentDate ? currentDate.toISOString() : "");
      setShowPicker((prev) => !prev);
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <>
      {type === "text" && (
        <TextInput
          className="outline-none bg-white"
          value={value}
          label={
            label ? (
              <Text
                style={{
                  color: focused ? "black" : "#7F7F88",
                }}
              >
                {label}
              </Text>
            ) : undefined
          }
          mode="outlined"
          outlineColor="#EAEAEA"
          activeOutlineColor={colors.bgColor}
          onChangeText={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...rest}
        />
      )}
      {type === "password" && (
        <>
          <TextInput
            className="outline-none bg-white"
            value={value}
            label={
              label ? (
                <Text
                  style={{
                    color: focused ? "black" : "#7F7F88",
                  }}
                >
                  {label}
                </Text>
              ) : undefined
            }
            mode="outlined"
            outlineColor="#EAEAEA"
            activeOutlineColor={colors.bgColor}
            onChangeText={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            secureTextEntry={type === "password" && !isShown}
            right={
              <TextInput.Icon
                size={18}
                icon={isShown ? "eye" : "eye-off"}
                onPress={() => {
                  setShown((prev) => !prev);
                }}
              />
            }
            {...rest}
          />
        </>
      )}
      {type === "date" && (
        <View>
          <Pressable
            className="w-full"
            onPress={() => setShowPicker((prev) => !prev)}
          >
            <TextInput
              className="outline-none"
              value={value === "" ? value : formatedate(value)}
              editable={false}
              onPressIn={() => setShowPicker((prev) => !prev)}
              mode="outlined"
              label={
                label ? (
                  <Text
                    style={{
                      color: focused ? "black" : "#7F7F88",
                    }}
                  >
                    {label}
                  </Text>
                ) : undefined
              }
              outlineColor="#EAEAEA"
              activeOutlineColor={colors.bgColor}
              onChangeText={onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              {...rest}
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
        </View>
      )}
      {type === "textarea" && (
        <TextInput
          className="outline-none"
          style={{ textAlignVertical: "top" }}
          label={
            label ? (
              <Text
                style={{
                  color: focused ? "black" : "#7F7F88",
                }}
              >
                {label}
              </Text>
            ) : undefined
          }
          mode="outlined"
          outlineColor="#EAEAEA"
          activeOutlineColor={colors.bgColor}
          onBlur={handleBlur}
          onFocus={handleFocus}
          multiline
          numberOfLines={numberOfLines || 5}
          value={value}
          onChangeText={onChange}
          placeholderTextColor="#7F7F88"
          {...rest}
        />
      )}
    </>
  );
};

export default ProfileInput;
