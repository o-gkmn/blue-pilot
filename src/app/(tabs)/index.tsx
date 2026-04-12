import { MapView } from "@/components/map-view";
import { Card } from "@/components/ui";
import { devices } from "@/data/devices";
import { useTheme } from "@/providers/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { getThemeColorByVariable } = useTheme();
  const iconColor = getThemeColorByVariable("text-secondary");
  const [insideYacht, setInsideYacht] = useState(false);

  // This method is unnecessary we remove it when we use real data from api
  const displayedDevices = devices.map((d) => {
    if (!insideYacht) {
      if (d.id === 9) return { ...d, value: "Aktif" };
      if (d.id === 11) return { ...d, value: "Kapali" };
    }
    return d;
  });

  return (
    <View className="flex-1 bg-background">
      <MapView insideYacht={insideYacht} onToggle={setInsideYacht} />
      <ScrollView className="flex-[6]" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap">
          {displayedDevices.map((device) => (
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
