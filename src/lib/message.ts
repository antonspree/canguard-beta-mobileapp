import Toast from "react-native-root-toast";
import { MessageType } from "@/types/utils";

const message = ({
  message = "",
  duration = 2500,
  position = 0,
}: MessageType) => {
  Toast.show(message, {
    duration: duration,
    position: position,
    animation: true,
    hideOnPress: true,
  });
};

export default message;
