import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

type ChipProps = {
  iconSource?: ImageSourcePropType;
  text?: string;
  value?: string;
  onPress?: () => void;
};

export function Chip({ iconSource, text, value, onPress }: ChipProps) {
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
          <View className={`flex-column items-start`}>
            {text && <Text className={`text-xs`}>{text}</Text>}
            {value && <Text className={`text-xs text-primary`}>{value}</Text>}
          </View>
        )}
      </View>
    </Pressable>
  );
}
