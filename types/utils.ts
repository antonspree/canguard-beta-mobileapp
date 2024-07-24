interface MessageType {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
}

export { MessageType };
