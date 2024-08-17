import ProfileInput from "@/components/ProfileInput";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface InserLinkFormSchema {
  link: string;
}

const InsertLinkModal = ({
  visible,
  closeModal,
  onSubmit,
}: {
  visible: boolean;
  closeModal: () => void;
  onSubmit: any;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InserLinkFormSchema>();

  const onSubmitForm = (data: InserLinkFormSchema) => {
    onSubmit(data.link);
    reset();
    closeModal();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeModal}
        style={{ backgroundColor: "white", borderRadius: 10 }}
      >
        <Dialog.Title>
          <Text variant="titleMedium">Erstellen eines Chats</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <Controller
              name="link"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <ProfileInput
                    value={value}
                    label="Título del chat*"
                    onChange={onChange}
                  />
                </View>
              )}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeModal} className="rounded-md">
            <Text variant="bodyMedium" className="font-semibold">
              Abbrechen
            </Text>
          </Button>
          <Button
            mode="contained"
            buttonColor="#19A873"
            onPress={handleSubmit(onSubmitForm)}
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

export default InsertLinkModal;
