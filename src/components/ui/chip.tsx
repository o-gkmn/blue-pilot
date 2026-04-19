import { useEffect } from "react";
import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type ChipProps = {
  iconSource?: ImageSourcePropType;
  text?: string;
  value?: string;
  loading?: boolean;
  onPress?: () => void;
};

function ChipSkeleton() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-row items-center gap-2 bg-foreground rounded-full px-3 py-1">
      <Animated.View
        style={animatedStyle}
        className="w-4 h-4 rounded-full bg-border"
      />
      <View className="flex-column items-start gap-1">
        <Animated.View
          style={animatedStyle}
          className="w-8 h-2.5 rounded bg-border"
        />
        <Animated.View
          style={animatedStyle}
          className="w-12 h-2.5 rounded bg-border"
        />
      </View>
    </View>
  );
}

export function Chip({ iconSource, text, value, loading, onPress }: ChipProps) {
  if (loading) {
    return <ChipSkeleton />;
  }

  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-2 bg-foreground rounded-full px-3 py-1">
        {iconSource && (
          <Image
            source={iconSource}
            className="text-sm"
            style={{ width: 16, height: 16 }}
          />
        )}
        {(text || value) && (
          <View className="flex-column items-start">
            {text && <Text className="text-xs">{text}</Text>}
            {value && <Text className="text-xs text-primary">{value}</Text>}
          </View>
        )}
      </View>
    </Pressable>
  );
}
