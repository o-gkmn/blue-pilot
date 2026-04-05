import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Appearance, View, ViewProps } from "react-native";
import { themes, themesVariables, ThemeVariants } from "./tokens";

import { SystemThemeVariants, ThemeContext, ThemesVariables } from "./context";

type ThemeProps = ViewProps;

const ThemeProvider = ({ children, ...props }: ThemeProps) => {
  const colorScheme = Appearance.getColorScheme();
  const userPreferedTheme = colorScheme === "light" ? "light" : "dark";

  const [theme, setTheme] = useState<ThemeVariants>(userPreferedTheme);
  const [systemEnabled, setSystemEnabled] = useState<boolean>(true);
  const [systemTheme, setSystemTheme] =
    useState<SystemThemeVariants>(userPreferedTheme);

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Load persisted theme once on mount
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme !== null && storedTheme !== "system") {
        setTheme(storedTheme as ThemeVariants);
        setSystemEnabled(false);
      } else {
        if (storedTheme === "system" || storedTheme === null) {
          try {
            await AsyncStorage.setItem("theme", "system");
            setTheme(userPreferedTheme);
            setSystemEnabled(true);
          } catch (e) {
            console.error("Error:", e);
          }
        } else {
          setSystemEnabled(false);
        }
      }
    })();
  }, []);

  // Listen for OS-level appearance changes — clean up on unmount
  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      async ({ colorScheme: scheme }) => {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme === "system" || storedTheme === null) {
          const resolved: SystemThemeVariants =
            scheme === "light" ? "light" : "dark";
          setSystemTheme(resolved);
          setTheme(resolved);
        }
      },
    );
    return () => subscription.remove();
  }, []);

  const handleThemeSwitch = useCallback(async (newTheme: ThemeVariants) => {
    if (newTheme === "system") {
      const resolved: SystemThemeVariants =
        Appearance.getColorScheme() === "light" ? "light" : "dark";
      setSystemEnabled(true);
      setSystemTheme(resolved);
      setTheme("system");
      await AsyncStorage.setItem("theme", "system");
    } else {
      setSystemEnabled(false);
      setTheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme);
    }
  }, []);

  const getThemeColorByVariable = useCallback(
    (colorKey: ThemesVariables) => {
      return themesVariables[currentTheme][`--${colorKey}`];
    },
    [currentTheme],
  );

  const getThemeColorByVariableAndAlpha = useCallback(
    (colorKey: ThemesVariables, alpha: number) => {
      const hex = themesVariables[currentTheme][`--${colorKey}`];
      const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
      return `${hex.slice(0, 7)}${alphaHex}`;
    },
    [currentTheme],
  );

  const contextValue = useMemo(
    () => ({ theme, systemEnabled, systemTheme }),
    [theme, systemEnabled, systemTheme],
  );

  return (
    <View style={themes[currentTheme]} className="flex-1" {...props}>
      <StatusBar
        style={currentTheme === "light" ? "dark" : "light"}
        backgroundColor={getThemeColorByVariable("background")}
      />
      <ThemeContext.Provider
        value={{
          systemEnabled: contextValue.systemEnabled,
          systemTheme: contextValue.systemTheme,
          theme: contextValue.theme,
          getThemeColorByVariable,
          getThemeColorByVariableAndAlpha,
          handleThemeSwitch,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </View>
  );
};

export const Theme = memo(ThemeProvider);
