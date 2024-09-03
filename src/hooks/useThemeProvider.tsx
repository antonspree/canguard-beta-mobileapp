import * as React from "react";

export type ThemeColorType = {
  bgColor: string;
  borderColor: string;
};

export type ColorSchemeType = {
  [key: string]: ThemeColorType;
};

export const colorScheme: ColorSchemeType = {
  light: {
    bgColor: "#19A873",
    borderColor: "[#19A873]/25",
  },
  grey: {
    bgColor: "#989898",
    borderColor: "[#989898]/25",
  },
  red: {
    bgColor: "#D14A4A",
    borderColor: "[#D14A4A]/25",
  },
  orange: {
    bgColor: "#F1873B",
    borderColor: "[#F1873B]/25",
  },
  yellow: {
    bgColor: "#DBEB7B",
    borderColor: "[#DBEB7B]/25",
  },
  lime: {
    bgColor: "#66ECB4",
    borderColor: "[#66ECB4]/25",
  },
  teal: {
    bgColor: "#6ECB88",
    borderColor: "[#6ECB88]/25",
  },
  cyan: {
    bgColor: "#4CB8E6",
    borderColor: "[#4CB8E6]/25",
  },
  sky: {
    bgColor: "#3A93B9",
    borderColor: "[#3A93B9]/25",
  },
  violet: {
    bgColor: "#744CE6",
    borderColor: "[#744CE6]/25",
  },
  purple: {
    bgColor: "#6A3AB9",
    borderColor: "[#6A3AB9]/25",
  },
  pink: {
    bgColor: "#E64C83",
    borderColor: "[#E64C83]/25",
  },
  fuchsia: {
    bgColor: "#B93AA5",
    borderColor: "[#B93AA5]/25",
  },
};

export interface ThemeProviderInterface {
  theme: keyof typeof colorScheme;
  setTheme: React.Dispatch<React.SetStateAction<keyof typeof colorScheme>>;
  colors: ThemeColorType;
}

export const ThemeContext = React.createContext<ThemeProviderInterface>({
  theme: "light",
  colors: colorScheme["light"],
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<keyof typeof colorScheme>("light");

  const colors = React.useMemo(() => {
    return colorScheme[theme];
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => React.useContext(ThemeContext);

export default ThemeProvider;
