import io from "socket.io-client";

const Socket = io(process.env.EXPO_PUBLIC_UPLOAD_URI as string, {
  transports: ["websocket", "polling"],
});

export default Socket;
