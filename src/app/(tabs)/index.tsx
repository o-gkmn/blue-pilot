import { Card } from "@/components/ui";
import { devices } from "@/data/devices";
import { useTheme } from "@/providers/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { getThemeColorByVariable } = useTheme();
  const iconColor = getThemeColorByVariable("text-secondary");

  return (
    <View className="flex-1 bg-background">
      <View className="flex-[4] items-center justify-center">
        <Text className="text-xl font-semibold text-text">Home</Text>
      </View>
      <ScrollView className="flex-[6]" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap">
          {devices.map((device) => (
            <Pressable
              key={device.id}
              className="w-1/3 aspect-square p-1.5"
              onPress={() =>
                router.push({
                  pathname: "/sensor-details",
                  params: { id: device.id },
                })
              }
            >
              <Card className="flex-1 justify-between">
                <MaterialCommunityIcons
                  name={device.icon as any}
                  size={24}
                  color={iconColor}
                />
                <Text className="text-sm font-semibold text-text">
                  {device.name}
                </Text>
                <Text className="text-sm text-text-secondary mt-1">
                  {device.value}
                </Text>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
