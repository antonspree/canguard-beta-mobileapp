import React, { useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, Portal } from "react-native-paper";
import Toast from "react-native-toast-message";
import { changePass } from "@/actions/auth";
import { useTheme } from "@/hooks/useThemeProvider";
import Text from "@/elements/Text";
import ProfileInput from "@/components/ProfileInput";

interface ChangePasswordForm {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

const ChangePasswordDialog = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { colors } = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ChangePasswordForm) => {
    setLoading(true);

    const { newPass, confirmPass } = data;

    if (newPass.length < 8) {
      Toast.show({
        type: "error",
        text1: "Benachrichtigung",
        text2: "Das Passwort muss mindestens 8 Zeichen lang sein.",
      });
    }

    if (newPass !== confirmPass) {
      Toast.show({
        type: "error",
        text1: "Benachrichtigung",
        text2: "Die Passwörter stimmen nicht überein.",
      });

      return;
    }

    const result = await changePass(data);
    console.log(result);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Erfolgreich",
        text2: result.msg,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Fehler",
        text2: result.msg,
      });
    }

    setLoading(false);

    reset();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "white", borderRadius: 10 }}
      >
        <Dialog.Title>
          <Text variant="titleMedium">Erstellen eines Chats</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <Controller
              name="currentPass"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <ProfileInput
                    type="password"
                    value={value}
                    label="Aktuelles Passwort"
                    onChange={onChange}
                  />
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              name="newPass"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <ProfileInput
                    type="password"
                    value={value}
                    label="Geben Sie Ihr Passwort ein"
                    onChange={onChange}
                  />
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              name="confirmPass"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <ProfileInput
                    type="password"
                    value={value}
                    label="Bestätigen Sie Ihr Passwort"
                    onChange={onChange}
                  />
                </View>
              )}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} className="rounded-md">
            <Text variant="bodyMedium" className="font-semibold">
              Abbrechen
            </Text>
          </Button>
          <Button
            mode="contained"
            buttonColor={colors.bgColor}
            onPress={handleSubmit(onSubmit)}
            className="rounded-md"
            contentStyle={{ paddingHorizontal: 16 }}
          >
            <Text variant="bodyMedium" className="font-semibold text-white">
              Erstellen
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangePasswordDialog;
