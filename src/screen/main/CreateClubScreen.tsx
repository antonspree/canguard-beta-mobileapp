import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { Card, ProfileInput } from "@/components";
import { createClub } from "@/actions/club";
import message from "@/lib/message";
import { CreateClubFormDataType } from "@/types/form";

const CreateClubScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateClubFormDataType>();

  const onSubmit = async (data: CreateClubFormDataType) => {
    const result = await createClub(data);

    message({ message: result.msg });

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
      dispatch(userActions.setUser({ user: result.user }));
      dispatch(membersActions.setMembers({ members: result.members }));

      router.replace("/(main)/club/profile");
    }
  };

  return (
    <ScrollView>
      <View className="p-5">
        <Card className="p-0">
          <View className="flex flex-col items-center space-y-2 p-5 border-b border-[#EAEAEA]">
            <Text className="font-bold text-center text-2xl">
              Lege deine Club-Daten fest
            </Text>
            <Text className="text-center text-base text-[#919191]">
              Du kannst alle Daten, später in den Einstellungen anpassen
            </Text>
          </View>
          <View className="space-y-5 p-5">
            <View className="space-y-4">
              <View className="space-y-2">
                <Text>Name*</Text>
                <View>
                  <Controller
                    name="clubname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="CSC e.V."
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.clubname && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
              </View>
              <View className="space-y-2">
                <Text>Adresse</Text>
                <View>
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Straße"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.street && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Hausnummer"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.address && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    name="postcode"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Postleitzahl"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.postcode && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Stadt"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.city && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Deutschland"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.country && (
                    <Text className="m-1 text-xs text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
              </View>
              <View className="space-y-2">
                <Text>Beschreibung</Text>
                <View>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="textarea"
                          placeholder="Beschreibung"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
            <Pressable
              className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-base text-white">Club erstellen</Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default CreateClubScreen;
