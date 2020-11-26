import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000",
    secondary: "#414757",
    error: "#f13a59",
    success: "#00B386",
    ...DefaultTheme.colors.background = "#ffffff",
  }
};
