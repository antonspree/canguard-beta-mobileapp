import { Pressable, Text } from "react-native";
import { Plus } from "lucide-react-native";
import { Container } from "@/components";

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
