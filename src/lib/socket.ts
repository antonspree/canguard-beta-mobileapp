import { UPLOAD_URI } from "@/config/env";
import io from "socket.io-client";

const Socket = io(UPLOAD_URI as string, {
  transports: ["websocket", "polling"],
});

export default Socket;
