import { createContext, useContext } from "react";
import { Appearance } from "react-native";
import { ThemeVariants } from "./tokens";

export type ThemesVariables =
  | "background"
  | "foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "accent"
  | "accent-foreground"
  | "danger"
  | "warning"
  | "info"
  | "success"
  | "border"
  | "overlay"
  | "text-primary"
  | "text-secondary"
  | "text-accent"
  | "text-success"
  | "text-disabled"
  | "text-placeholder"
  | "text-inverse";

export type SystemThemeVariants = "dark" | "light";

type ThemeContextProps = {
  theme: ThemeVariants;
  systemTheme: SystemThemeVariants;
  systemEnabled: boolean;
  handleThemeSwitch: (newTheme: ThemeVariants) => void;
  getThemeColorByVariable: (colorKey: ThemesVariables) => string;
  getThemeColorByVariableAndAlpha: (
    colorKey: ThemesVariables,
    alpha: number,
  ) => string;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  systemTheme: Appearance.getColorScheme() === "light" ? "light" : "dark",
  systemEnabled: true,
} as ThemeContextProps);

export function useTheme() {
  return useContext(ThemeContext);
}
