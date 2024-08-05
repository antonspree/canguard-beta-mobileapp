import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Container from "@/components/Container";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeDoc } from "@/actions/club";
import Toast from "react-native-toast-message";
import { IClubDocument, clubActions } from "@/store/reducers/clubReducer";

const DeleteConfirmDialog = ({
  visible,
  hideDialog,
  submit,
}: {
  visible: boolean;
  hideDialog: () => void;
  submit: () => void;
}) => {
  const handleSubmit = async () => {
    await submit();
    hideDialog();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ backgroundColor: "#ffffff" }}
      >
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Stornieren</Button>
          <Button mode="contained" buttonColor="#19A873" onPress={handleSubmit}>
            <Text className="font-bold text-center text-sm text-white">
              Löschen
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const DocumentEditModal = ({ item }: { item?: IClubDocument }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(item?.documentname || "");
  const [description, setDescription] = useState(item?.description || "");

  return <View></View>;
};

const DocumentItem = ({ item }: { item: IClubDocument }) => {
  const dispatch = useAppDispatch();

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleSubmit = async () => {
    const result = await removeDoc({ documentID: item.documentID });

    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: "Document deleted",
    });

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
    }
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center space-x-2">
        <Ionicons name="document-text-outline" size={32} color="#808089" />
        <View className="mb-0.5">
          <Text>{item.documentname}</Text>
          <Text className="text-[10px] text-[#808089]">{item.date}</Text>
        </View>
      </View>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerOuterWrapper: {
              borderRadius: 100,
              overflow: "hidden",
            },
          }}
        >
          <IconButton icon="dots-vertical" size={16} iconColor="#808089" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: { borderRadius: 5, padding: 5 },
          }}
        >
          <MenuOption onSelect={() => {}}>
            <View className="flex-row items-center space-x-2">
              <Feather name="edit-3" size={12} />
              <Text className="text-xs">Bearbeiten</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => setDeleteDialogVisible(true)}>
            <View className="flex-row items-center space-x-2">
              <MaterialIcons name="delete" size={12} color="#EF4444" />
              <Text className="text-xs text-[#EF4444]">Löschen</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <DeleteConfirmDialog
        visible={deleteDialogVisible}
        hideDialog={() => setDeleteDialogVisible(false)}
        submit={handleSubmit}
      />
    </View>
  );
};

const DocumentsScreen = () => {
  const dispatch = useAppDispatch();

  const { club } = useAppSelector((state) => state.club);
  const { user } = useAppSelector((state) => state.user);

  const [document, setDocument] = useState<any>([]);

  const handleSubmit = () => {};

  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="">
              <Text className="font-semibold text-lg">Dokumente</Text>
              <Text className="text-xs text-[#808089]">
                Füge Dokumente deines Clubs hinzu, die für Mitglieder sichtbar
                sind. Lege fest, welche Dokumente bei Mitgliedsanfragen
                akzeptiert werden müssen.
              </Text>
            </View>
          </View>
          {club?.document ? (
            <View className="px-4 py-3">
              {club?.document.map((item: IClubDocument, key) => (
                <DocumentItem item={item} key={key} />
              ))}
            </View>
          ) : null}
          <View className="flex-row px-4 py-3">
            <Button
              mode="contained"
              buttonColor="#19A873"
              onPress={handleSubmit}
              className="rounded-lg"
            >
              <Text className="font-bold text-center text-xs text-white">
                Speichern
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default DocumentsScreen;
