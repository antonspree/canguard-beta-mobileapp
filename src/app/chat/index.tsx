import { Container } from "@/components";
import { Plus } from "lucide-react-native";
import { Pressable, Text } from "react-native";

const Chat: React.FC = () => {
  return (
    <Container>
      <Pressable className="flex flex-row items-center">
        <Plus color={"#000000"} size={20} />
        <Text>Chat erstellen</Text>
      </Pressable>
    </Container>
  );
};

export default Chat;
