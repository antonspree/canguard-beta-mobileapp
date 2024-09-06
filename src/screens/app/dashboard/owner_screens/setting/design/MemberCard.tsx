import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { Button, RadioButton, Switch } from "react-native-paper";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { cardTextColorData } from "@/lib/constant";
import { UPLOAD_URI } from "@/config/env";
import Text from "@/elements/Text";
import { updateCard } from "@/actions/club";
import { useDispatch } from "react-redux";
import { clubActions } from "@/store/reducers/clubReducer";
import { useTheme } from "@/hooks/useThemeProvider";

const MemberCard = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { user } = useAppSelector((store) => store.user);
  const { club } = useAppSelector((state) => state.club);

  const [frontImg, setFrontImg] = useState<string>();
  const [previewFrontImage, setPreviewFrontImage] = useState<any>();
  const [removedFrontImg, setRemovedFrontImg] = useState<boolean>(false);
  const [backImg, setBackImg] = useState<string>();
  const [previewBackImage, setPreviewBackImage] = useState<any>();
  const [removedBackImg, setRemovedBackImg] = useState<boolean>(false);

  const [cardColor, setCardColor] = useState(cardTextColorData[0].name);
  const [textColor, setTextColor] = useState(cardTextColorData[0].name);
  const [logoColor, setLogoColor] = useState(cardTextColorData[0].name);
  const [qrPos, setQrPos] = useState<string>("left");
  const [isLogo, setIsLogo] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);

  const pickFrontImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
                 roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPreviewFrontImage(result.assets[0]);
      }
    }
  };

  const pickBackImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPreviewBackImage(result.assets[0]);
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // console.log(
    //   cardColor,
    //   textColor,
    //   logoColor,
    //   frontImg,
    //   removedFrontImg,
    //   backImg,
    //   removedBackImg,
    //   qrPos,
    //   isLogo,
    //   isAvatar
    // );

    formData.append("cardColor", cardColor);
    formData.append("textColor", textColor);
    formData.append("logoColor", logoColor);
    formData.append("frontBadge", frontImg || "");
    formData.append("frontRemoveBadge", String(removedFrontImg));
    formData.append("backBadge", backImg || "");
    formData.append("backRemoveBadge", String(removedBackImg));
    formData.append("position", qrPos);
    formData.append("logoShown", String(isLogo));
    formData.append("clubShown", String(isAvatar));

    const result = await updateCard(formData);

    Toast.show({
      type: "success",
      text1: "Glückwunsch",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
    }
  };

  useEffect(() => {
    setCardColor(club?.card?.cardColor as string);
    setTextColor(club?.card?.textColor as string);
    setLogoColor(club?.card?.logoColor as string);
    setFrontImg(club?.card?.frontBadge);
    setBackImg(club?.card?.backBadge);
    setQrPos(club?.card?.position as string);
    setIsLogo(club?.card?.logoShown as boolean);
    setIsAvatar(club?.card?.clubShown as boolean);
  }, [club]);

  return (
    <View className="bg-white rounded-2xl mb-4">
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="">
          <Text className="font-semibold text-lg">Hintergrundfarbe</Text>
          <Text className="text-xs text-[#808089]">
            Der Hintergrund des Ausweises
          </Text>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="mb-4">
          <View className="mb-6 space-y-1">
            <Text className="text-sm">Textfarbe</Text>
            <Text className="text-[#808089] text-xs">
              Wähle die Farbe des Textes auf deinem Ausweis
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-1 items-center mx-auto justify-center px-4">
            {cardTextColorData.map((item, key) => (
              <Pressable
                key={key}
                className={`w-7 h-7 ${item.bgColor}${
                  cardColor === item.name
                    ? ` border-4 ${item.borderColor}`
                    : ` border-2 border-white`
                } rounded-full`}
                onPress={() => setTextColor(item.name)}
              >
                <View></View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="mb-4">
          <View className="mb-4 space-y-1">
            <Text className="text-sm">Hintergrundbilder</Text>
          </View>
          <View className="items-center space-y-2 mb-4">
            <Text>Vorderseite</Text>
            {!frontImg && !previewFrontImage ? (
              <Pressable
                onPress={pickFrontImage}
                className="items-center justify-center w-60 h-48 rounded-lg bg-[#f8f8f8]"
              >
                <View className="px-5">
                  <Text className="text-center text-xs text-[#808089]">
                    Erlaubte Dateitypen : .jpg, .jpeg, .png, .webp (maximum
                    10MB)
                  </Text>
                </View>
              </Pressable>
            ) : previewFrontImage ? (
              <Pressable onPress={pickFrontImage}>
                <Image
                  source={previewFrontImage.uri}
                  placeholder="background"
                  className="w-60 h-48 rounded-lg"
                />
                <Pressable
                  style={tw`absolute top-2 right-2`}
                  onPress={() => {
                    setFrontImg(undefined);
                    setPreviewFrontImage(undefined);
                    setRemovedFrontImg(true);
                  }}
                >
                  <MaterialCommunityIcons
                    color={"#ef4444"}
                    size={16}
                    name={"delete-outline"}
                  />
                </Pressable>
              </Pressable>
            ) : (
              <Pressable onPress={pickFrontImage}>
                <Image
                  source={UPLOAD_URI + frontImg}
                  placeholder="background"
                  className="w-60 h-48 rounded-lg"
                />
                <Pressable
                  style={tw`absolute top-2 right-2`}
                  onPress={() => {
                    setFrontImg(undefined);
                    setPreviewFrontImage(undefined);
                    setRemovedFrontImg(true);
                  }}
                >
                  <MaterialCommunityIcons
                    color={"#ef4444"}
                    size={16}
                    name={"delete-outline"}
                  />
                </Pressable>
              </Pressable>
            )}
          </View>
          <View className="items-center space-y-2 mb-4">
            <Text>Rückseite</Text>
            {!backImg && !previewBackImage ? (
              <Pressable
                onPress={pickBackImage}
                className="items-center justify-center w-60 h-48 rounded-lg bg-[#f8f8f8]"
              >
                <View className="px-5">
                  <Text className="text-center text-xs text-[#808089]">
                    Erlaubte Dateitypen : .jpg, .jpeg, .png, .webp (maximum
                    10MB)
                  </Text>
                </View>
              </Pressable>
            ) : previewBackImage ? (
              <Pressable onPress={pickBackImage}>
                <Image
                  source={previewBackImage.uri}
                  placeholder="background"
                  className="w-60 h-48 rounded-lg"
                />
                <Pressable
                  style={tw`absolute top-2 right-2`}
                  onPress={() => {
                    setBackImg(undefined);
                    setPreviewBackImage(undefined);
                    setRemovedBackImg(true);
                  }}
                >
                  <MaterialCommunityIcons
                    color={"#ef4444"}
                    size={16}
                    name={"delete-outline"}
                  />
                </Pressable>
              </Pressable>
            ) : (
              <Pressable onPress={pickBackImage}>
                <Image
                  source={UPLOAD_URI + backImg}
                  placeholder="background"
                  className="w-60 h-48 rounded-lg"
                />
                <Pressable
                  style={tw`absolute top-2 right-2`}
                  onPress={() => {
                    setBackImg(undefined);
                    setPreviewBackImage(undefined);
                    setRemovedBackImg(true);
                  }}
                >
                  <MaterialCommunityIcons
                    color={"#ef4444"}
                    size={16}
                    name={"delete-outline"}
                  />
                </Pressable>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="mb-4">
          <View className="mb-6 space-y-1">
            <Text className="text-sm">Textfarbe</Text>
            <Text className="text-[#808089] text-xs">
              Wähle die Farbe des Textes auf deinem Ausweis
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-1 items-center mx-auto justify-center px-4">
            {cardTextColorData.map((item, key) => (
              <Pressable
                key={key}
                className={`w-7 h-7 ${item.bgColor}${
                  textColor === item.name
                    ? ` border-4 ${item.borderColor}`
                    : ` border-2 border-white`
                } rounded-full`}
                onPress={() => setTextColor(item.name)}
              >
                <View></View>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mb-4">
          <View className="mb-6 space-y-1">
            <Text className="text-sm">Canify Logofarbe</Text>
            <Text className="text-[#808089] text-xs">
              Wähle die Farbe des Canify Logos
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-1 items-center mx-auto justify-center px-4">
            {cardTextColorData.map((item, key) => (
              <Pressable
                key={key}
                className={`w-7 h-7 ${item.bgColor}${
                  logoColor === item.name
                    ? ` border-4 ${item.borderColor}`
                    : ` border-2 border-white`
                } rounded-full`}
                onPress={() => setLogoColor(item.name)}
              >
                <View></View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="mb-4">
          <View className="mb-6 space-y-1">
            <Text className="text-sm">QR-Code Position</Text>
            <Text className="text-[#808089] text-xs">
              Wähle wo der QR Code auf dem Ausweis platziert sein soll.
            </Text>
          </View>
          <View className="space-y-1">
            <View className="flex-row items-center space-x-2">
              <RadioButton
                value="first"
                status={qrPos === "left" ? "checked" : "unchecked"}
                onPress={() => setQrPos("left")}
              />
              <View>
                <Text className="text-xs">Links</Text>
                <Text className="text-[10px] text-[#808089]">
                  Platziere den QR Code Links auf dem Ausweis
                </Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <RadioButton
                value="first"
                status={qrPos === "middle" ? "checked" : "unchecked"}
                onPress={() => setQrPos("middle")}
              />
              <View>
                <Text className="text-xs">Mittig</Text>
                <Text className="text-[10px] text-[#808089]">
                  Platziere den QR Code mittig auf dem Ausweis
                </Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <RadioButton
                value="first"
                status={qrPos === "right" ? "checked" : "unchecked"}
                onPress={() => setQrPos("right")}
              />
              <View>
                <Text className="text-xs">Rechts</Text>
                <Text className="text-[10px] text-[#808089]">
                  Platziere den QR Code Rechts auf dem Ausweis
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="space-y-4">
          <View className="flex-row justify-between">
            <View className="flex-1 space-y-1">
              <Text className="text-sm">Canify Hintergrundlogo</Text>
              <Text className="text-[#808089] text-xs">
                Wähle ob das Canify Logo im Hintergrund angezeigt wird.
              </Text>
            </View>
            <Switch value={isLogo} onValueChange={setIsLogo} />
          </View>
          <View className="flex-row justify-between">
            <View className="flex-1 space-y-1">
              <Text className="text-sm">Club Avatar</Text>
              <Text className="text-[#808089] text-xs">
                Wähle ob der Club Avatar angezeigt wird.
              </Text>
            </View>
            <Switch value={isAvatar} onValueChange={setIsAvatar} />
          </View>
        </View>
      </View>
      <View className="flex-row justify-end px-4 py-3">
        <Button
          mode="contained"
          buttonColor={colors.bgColor}
          onPress={handleSubmit}
          className="rounded-lg"
          disabled={
            user?.role !== "owner" &&
            !user?.functions?.includes("club-settings-design-changedata")
          }
        >
          <Text className="font-bold text-center text-xs text-white">
            Speichern
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default MemberCard;
