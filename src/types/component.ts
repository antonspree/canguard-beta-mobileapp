interface AuthInputProps {
  type?: "text" | "password";
  value?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

// ---------------------------------------------------------

interface ContainerProps {
  children?: React.ReactNode;
}

interface TextLinkProps {
  title?: string;
  href?: string;
  color?: string;
}

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onPress: () => void;
}

interface SocialButtonTypes {
  type?: "google" | "facebook";
  title?: string;
  onPress: () => void;
}

interface PreviousProps {
  type?: "prev" | "close";
  title?: string;
}

interface ListItemProps {
  icon?: React.ReactNode;
  title?: string;
  linkTitle?: string;
  linkURL?: any;
}

interface ProfileInputProps {
  name?: string;
  editable?: boolean;
  value?: string;
  placeholder?: string;
  onChangeText: (name: string, text: string) => void;
}

interface TabButtonProps {
  title?: string;
  index?: number;
  current?: number;
  onPress: (index: number) => void;
}

interface HomeInputProps {
  title?: string;
  name?: string;
  value?: string;
  onChangeText: (name: string, text: string) => void;
}

interface HomeTabProps {
  title?: string;
  index?: number;
  current?: number;
  onPress: (index: number) => void;
}

export {
  ContainerProps,
  AuthInputProps,
  TextLinkProps,
  ButtonProps,
  SocialButtonTypes,
  PreviousProps,
  ListItemProps,
  ProfileInputProps,
  TabButtonProps,
  HomeInputProps,
  HomeTabProps,
};
