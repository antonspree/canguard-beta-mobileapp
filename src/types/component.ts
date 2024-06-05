export interface ContainerProps {
  children?: React.ReactNode;
}

export interface AuthInputProps {
  type?: "text" | "password" | "date";
  value?: string;
  placeholder?: string;
  onChange: (text: string) => void;
}

export interface ClubCardPropsInterface {
  title: string;
  icon: React.ReactNode;
  content: string;
  btnIcon: React.ReactNode;
  btnText: string;
  route: any;
}
