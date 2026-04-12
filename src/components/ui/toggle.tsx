import { useTheme } from "@/providers/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type ToggleOption = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  value: string;
};

export type ToggleProps = {
  active: boolean;
  options: [ToggleOption, ToggleOption];
  isTextVisible?: boolean;
  onToggle: (active: boolean) => void;
};

const SLIDE = { duration: 250, easing: Easing.out(Easing.cubic) };

export function Toggle({
  active,
  options,
  isTextVisible,
  onToggle,
}: ToggleProps) {
  const pillWidth = isTextVisible ? 110 : 55;
  const slideX = useSharedValue(active ? pillWidth : 0);

  const { getThemeColorByVariable } = useTheme();
  const activeIconColor = getThemeColorByVariable("foreground");
  const inactiveIconColor = getThemeColorByVariable("background");

  useEffect(() => {
    slideX.value = withTiming(active ? pillWidth : 0, SLIDE);
  }, [active]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  return (
    <View
      className="flex-row rounded-3xl bg-secondary p-[3px]"
      style={{ width: pillWidth * 2 + 6 }}
    >
      <Animated.View
        className="absolute top-[3px] bottom-[3px] left-[3px] rounded-[20px] bg-primary"
        style={[{ width: pillWidth }, pillStyle]}
      />

      {options.map((option, index) => {
        const isActive = active === (index === 1);
        return (
          <Pressable
            key={option.value + index}
            className="flex-row items-center justify-center gap-1.5 rounded-[20px] py-2 z-10"
            style={{ width: pillWidth }}
            onPress={() => onToggle(index === 1)}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={14}
              color={isActive ? activeIconColor : inactiveIconColor}
            />
            {isTextVisible && (
              <Text
                className="text-xs font-semibold"
                style={{
                  color: isActive ? activeIconColor : inactiveIconColor,
                }}
              >
                {option.value}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
