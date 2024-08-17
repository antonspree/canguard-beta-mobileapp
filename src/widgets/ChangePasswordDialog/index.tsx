import React from "react";
import { View } from "react-native";
import { Dialog } from "react-native-paper";

const ChangePasswordDialog = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Change Password</Dialog.Title>
      <Dialog.Content>
        <View></View>
      </Dialog.Content>
    </Dialog>
  );
};

export default ChangePasswordDialog;
