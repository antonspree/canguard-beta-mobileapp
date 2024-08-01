import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import Container from "@/components/Container";
import ProfileInput from "@/components/ProfileInput";
import { updateClub } from "@/actions/club";
import { clubActions } from "@/store/reducers/clubReducer";
import { ClubProfileFormSchema } from "@/types/form";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ClubProfileFormSchema>();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>();
  const [removeAvatar, setRemoveAvatar] = useState<any>();
  const [badge, setBadge] = useState<any>();
  const [removeBadge, setRemoveBadge] = useState<any>(false);

  const onSubmit = async (data: ClubProfileFormSchema) => {
		console.log(data);
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      value !== undefined && formData.append(key, value as string);
    });

    formData.append("avatar", avatar);
    formData.append("badge", badge);
    formData.append("removeAvatar", removeAvatar);
    formData.append("removeBadge", removeBadge);

    const result = await updateClub(formData);

    setLoading(false);

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
      Toast.show({
        type: "success",
        text1: "Glückwunsch",
        text2: result.msg,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Glückwunsch",
        text2: result.msg,
      });
    }
  };

  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-xl mb-4">
          <View className="py-3 px-3 border-b border-gray-100">
            <Text className="text-[#808089] text-[10px] leading-4">
              Here you can customize your club according to your needs
            </Text>
          </View>
          <View className="py-3 px-3">
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">
                Banners & Avatars
              </Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Wähle ein Banner und ein Avatar für deinen Club aus. Das
                optimale Format des Banners ist 16:5 (z.B. 1600x500px). Der
                Avatar sollte quadratisch sein (z.B. 500x500px). Die Bilder
                werden unter Anderem in der Clubsuche angezeigt.
              </Text>
              <View className="relative rounded-lg pt-[40%] overflow-hidden  bg-gray-200">
                <Pressable className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                  <Text>Select Image...</Text>
                </Pressable>
              </View>
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Name *</Text>
              <Controller
                name="clubname"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="CSC e.V."
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Website</Text>
              <Controller
                name="website"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://www.beispiel.de"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">E-Mail</Text>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="info@beispiel.de"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Telefon</Text>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="0123456789"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Adresse</Text>
              <Controller
                name="street"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-2">
                    <ProfileInput
                      value={value}
                      type="text"
                      label="Straße"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-2">
                    <ProfileInput
                      value={value}
                      type="text"
                      label="Hausnummer"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                name="postcode"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-2">
                    <ProfileInput
                      value={value}
                      type="text"
                      label="Postleitzahl"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-2">
                    <ProfileInput
                      value={value}
                      type="text"
                      label="Stadt"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="Deutschland"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Location</Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Determine the latitude and longitude to position your club
                perfectly on the map
              </Text>
              <View className="relative rounded-lg pt-[40%] overflow-hidden  bg-gray-200">
                <Pressable className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                  <Text>Select Image...</Text>
                </Pressable>
              </View>
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Beschreibung</Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Beschreibe die Besonderheit deines Clubs.
              </Text>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="textarea"
                      label="Beschreibung"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">
                Jugendschutz & Prävention
              </Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Dieser Abschnitt ist für dein Jugendschutz- und Päventionsteam
                gedacht. Füge Kontaktdaten, allgemeine Hinweise und weitere
                Anlaufstellen für deine Mitglieder hinzu.
              </Text>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="textarea"
                      label="Jugendschutz & Prävention"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Discord</Text>
              <Controller
                name="discord"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://discord.gg/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">TikTok</Text>
              <Controller
                name="tiktok"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://tiktok.com/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">YouTube</Text>
              <Controller
                name="youtube"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://youtube.com/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Twitch</Text>
              <Controller
                name="youtube"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://twitch.tv/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Instagram</Text>
              <Controller
                name="instagram"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://instagram.com/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">X</Text>
              <Controller
                name="twitter"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://x.com/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Facebook</Text>
              <Controller
                name="facebook"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="text"
                      label="https://facebook.com/"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Impressum</Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Hier kannst du ein offizielles Impressum für deinen Club
                hinterlegen.
              </Text>
              <Controller
                name="imprint"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      type="textarea"
                      label="Beispiel Club e.V. Musterstraße 12A 21212 Musterstadt"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">
                Maximum number of members
              </Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                Once this limit is reached, no more members can be added.
              </Text>
              <Controller
                name="maxUser"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={(value || "").toString()}
                      type="text"
                      label="500"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Minimum age</Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                The minimum age to become a member of the club.
              </Text>
              <Controller
                name="minAge"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={(value || "").toString()}
                      type="text"
                      label="18"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold text-xs mb-2">Club ID</Text>
              <Text className="text-[#808089] text-[10px] leading-4 mb-2">
                The identifier is used to identify the club and generate
                membership numbers.
              </Text>
              <Text className="px-3">pWKt</Text>
            </View>
            <Pressable
              className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-base font-bold text-white">Einloggen</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
