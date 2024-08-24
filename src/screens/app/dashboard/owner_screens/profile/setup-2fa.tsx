import { confirmPass } from "@/actions/user";
import { userActions } from "@/store/reducers/userReducer";
import { Image } from "expo-image";
import React from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { Button, Dialog } from "react-native-paper";
import DialogContent from "react-native-paper/lib/typescript/components/Dialog/DialogContent";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import ProfileInput from "@/components/ProfileInput";
import { View } from "react-native";
import Text from "@/elements/Text";

interface TwoFAPassFormSchema {
  password: string;
}

const Setup2faDialog = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TwoFAPassFormSchema>();

  const [qrCodeToken, setQRCodeToken] = React.useState("");
  const [qrCode, setQRCode] = React.useState("");
  const [twoFAOpen, setTwoFAOpen] = React.useState(false);
  const twoFAPassForm = useForm<TwoFAPassFormSchema>({
    defaultValues: {
      password: "",
    },
  });

  const onTwoFAPassSubmit = async (data: TwoFAPassFormSchema) => {
    const result = await confirmPass(data);

    if (result.success) {
      if (result.status) {
        setTwoFAOpen((prev) => !prev);
        setQRCode(result.qrcode);
        setQRCodeToken(result.token);
      } else {
        dispatch(userActions.setUser({ user: result.user }));

        Toast.show({
          type: "success",
          text1: "Success",
          text2: result.msg,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.msg,
      });
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onClose}>
      <DialogContent className="max-w-[544px] w-full flex flex-col gap-0 overflow-hidden rounded-3xl p-0">
        <View className="flex items-center space-x-3 p-8 pb-5 border-b mobile:pb-3">
          <Image source="/assets/images/main.svg" alt="logo" />
          <Text className="text-lg font-bold tablet:text-base">
            Sicherheitskontrolle
          </Text>
        </View>
        <View className="flex flex-col space-y-3 p-8 mobile:p-5">
          <Text className="text-sm mobile:text-xs">
            Bitte geben Sie Ihr Passwort ein, um zu bestätigen, das Sie Inhaber
            dieses Kontos sind.
          </Text>
          <View className="flex flex-col space-y-5 tablet:space-y-3">
            <Controller
              name="password"
              control={twoFAPassForm.control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <ProfileInput
                    value={value}
                    type="password"
                    label="Passwort"
                    onChange={onChange}
                  />
                </View>
              )}
            />
            <View className="self-end flex items-center space-x-3 mobile:self-auto mobile:justify-evenly">
              <Button
                className="h-10 px-4 mobile:px-2"
                mode="elevated"
                onPress={() => handleSubmit(onTwoFAPassSubmit)}
              >
                Abbrechen
              </Button>
              <Button className="h-10 bg-custom px-4 hover:bg-customhover mobile:px-2">
                <Text className="text-sm">Passwort bestätigen</Text>
              </Button>
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};
