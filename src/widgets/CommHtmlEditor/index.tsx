import React, { useRef } from "react";
import { Alert, PermissionsAndroid, Pressable, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CommHtmlEditor = ({
  message,
  setMessage,
  disabled,
  documents,
  setDocuments,
  handleImages,
  votes,
  setVotes,
  onSend,
  imgsCount,
  docsCount,
  voteAvailable,
}: {
  message: string;
  setMessage: any;
  disabled?: boolean;
  documents: any;
  setDocuments: any;
  handleImages: any;
  votes?: any;
  setVotes?: any;
  onSend: (message: string) => {};
  imgsCount: number;
  docsCount: number;
  voteAvailable?: boolean;
}) => {
  const checkPermissions = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (!result) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title:
              "Sie müssen die Speicherberechtigung erteilen, um die Datei herunterladen und speichern zu können",
            message: "Die App benötigt Zugriff auf Ihre Kamera",
            buttonNeutral: "Frag mich später",
            buttonNegative: "Stornieren",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Sie können die Kamera verwenden");
          return true;
        } else {
          Alert.alert("Fehler", "PERMISSION_ACCESS_FILE");

          console.log("Kameraberechtigung verweigert");
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const richText = useRef<any>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Zugriff verweigert",
        `Entschuldigung, zum Hochladen von Bildern benötigen wir die Berechtigung für die Kamerarolle.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled && result.assets && result.assets.length > 0) {
        handleImages(result.assets[0]);
      }
    }
  };

  const pickDocument = async () => {
    try {
      const result = await checkPermissions();

      if (result) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
        });
        console.log("console started");
        console.log(documents);
        console.log(result);
        console.log("console ended");

        if (!result.canceled) {
          // Setting the state to show single file attributes
          setDocuments([...documents, result]);
        }
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <View>
      <View className="bg-[#F8F8F8] p-2">
        <RichEditor
          ref={richText}
          onChange={setMessage}
          placeholder="Teile deine Gedanken..."
          initialHeight={64}
          style={{
            backgroundColor: "#F8F8F8",
            maxHeight: 180,
            overflow: "hidden",
          }}
          initialContentHTML=""
          initialFocus
          scrollEnabled
        />
        <View className="flex-row mt-2 space-x-1.5 px-2">
          <Pressable onPress={pickDocument} disabled={docsCount >= 5}>
            <MaterialCommunityIcons
              color={"#19A873"}
              size={16}
              name={"plus-circle-outline"}
            />
          </Pressable>
          <Pressable onPress={pickImage} disabled={imgsCount >= 10}>
            <MaterialCommunityIcons
              color={"#19A873"}
              size={16}
              name={"file-image-plus-outline"}
            />
          </Pressable>
          <Pressable>
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={16}
              color="#19A873"
            />
          </Pressable>
          <Pressable disabled={!voteAvailable}>
            <MaterialCommunityIcons
              color={"#19A873"}
              size={16}
              name={"chart-line"}
            />
          </Pressable>
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
};

export default CommHtmlEditor;
