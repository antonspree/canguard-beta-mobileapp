import Toast from "react-native-toast-message";
import { MessageType } from "@/types/utils";

const message = ({ type, title, message }: MessageType) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
  });
};

export default message;
