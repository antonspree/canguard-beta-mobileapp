import React, { useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, Portal } from "react-native-paper";
import ProfileInput from "@/components/ProfileInput";
import { resetPass } from "@/actions/auth";
import Text from "@/elements/Text";

interface ChangePasswordForm {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePasswordDialog = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ChangePasswordForm) => {
    setLoading(true);

    const result = await resetPass(data);
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
              name="currentPassword"
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
              name="password"
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
              name="confirmPassword"
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
            buttonColor="#19A873"
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
