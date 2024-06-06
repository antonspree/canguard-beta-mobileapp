export interface ContainerProps {
  children?: React.ReactNode;
}

export interface ProfileInputProps {
  type?: "text" | "password" | "date" | "textarea";
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

export interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
}
