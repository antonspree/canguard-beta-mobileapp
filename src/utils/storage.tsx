import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SignInFormDataType,
  SignUpFormDataType,
} from "@/types/auth";



const saveData = async (
  index: string,
  data: SignInFormDataType | SignUpFormDataType | string
) => {
  try {
    if (Platform.OS === "web") {
      if (typeof data === "string") {
        localStorage.setItem(index, data);
      } else {
        localStorage.setItem(index, JSON.stringify(data));
      }
    } else {
      if (typeof data === "string") {
        await AsyncStorage.setItem(index, data);
      } else {
        await AsyncStorage.setItem(index, JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error("Error saving form data:", error);

    throw new Error("Failed to save form data");
  }
};

const loadData = async (index: string) => {
  try {
    let savedFormData = null;

    if (Platform.OS === "web") {
      savedFormData = localStorage.getItem(index);
    } else {
      savedFormData = await AsyncStorage.getItem(index);
    }

    return savedFormData;
  } catch (error) {
    console.error("Error loading form data:", error);

    throw new Error("Failed to load form data");
  }
};

const clearData = async (index: string) => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(index);
    } else {
      await AsyncStorage.removeItem(index);
    }
  } catch (error) {
    console.error("Error clearing form data:", error);

    throw new Error("Failed to clear form data");
  }
};

export { saveData, loadData, clearData };
