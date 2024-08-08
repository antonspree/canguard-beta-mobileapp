export interface ContainerProps {
  children?: React.ReactNode;
}

export interface DetailContainerProps {
  children?: React.ReactNode;
  backLink?: string;
  title: string;
}

export interface ProfileInputProps {
  type?: "text" | "password" | "date" | "textarea";
  value?: string;
  label?: string;
  onChange: (text: string) => void;
  numberOfLines?: number;
  [key: string]: any;
}

export interface ClubCardPropsInterface {
  title: string;
  icon: React.ReactNode;
  content: string;
  btnIcon: React.ReactNode;
  btnText: string;
  route: any;
  iconName?: string;
}

export interface ClubPropsInterface {
  clubname: string;
  badge?: string;
  avatar?: string;
  users: number;
  maxUser: number;
  description: string;
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  discord?: string;
  facebook?: string;
  youtube?: string;
  clubID?: string;
  allowRequest?: boolean;
}

export interface AnalyticPropsInterface {
  title: string;
  content: string | number;
  info: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
}

export interface ClubStatusPropsInterface {
  done: boolean;
  title: string;
  content: string;
}
