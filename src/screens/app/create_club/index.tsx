import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import tw from "twrnc";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { createClub } from "@/actions/club";
import message from "@/lib/message";
import { CreateClubFormDataType } from "@/types/form";
import ProfileInput from "@/components/ProfileInput";
import Card from "@/components/Card";
import Text from "@/elements/Text";
import { useTheme } from "@/hooks/useThemeProvider";

const CreateClubScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateClubFormDataType>();

  const onSubmit = async (data: CreateClubFormDataType) => {
    const result = await createClub(data);

    message({ message: result.msg });

    console.log(result);

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
      dispatch(userActions.setUser({ user: result.user }));
      dispatch(membersActions.setMembers({ members: result.members }));

      router.replace("/(app)/(dashboard)/setting");
    }
  };

  return (
    <ScrollView>
      <View className="m-5">
        <Card className="p-0">
          <View className="flex flex-col items-center space-y-2 p-5 border-b border-[#EAEAEA]">
            <Text className="font-bold text-xl">
              Lege deine Club-Daten fest
            </Text>
            <Text className="text-base text-[#919191]">
              Du kannst alle Daten, später in den Einstellungen anpassen
            </Text>
          </View>
          <View className="space-y-5 p-5">
            <View className="space-y-3">
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
                          label="CSC e.V."
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
                          label="Straße"
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
                          label="Hausnummer"
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
                          label="Postleitzahl"
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
                          label="Stadt"
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
                          label="Deutschland"
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
                          label="Beschreibung"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
            <Pressable
              style={tw`flex justify-center items-center py-2 bg-[${colors.bgColor}] rounded-md`}
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
