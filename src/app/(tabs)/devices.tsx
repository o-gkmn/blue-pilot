import { Card } from "@/components/ui";
import { devices } from "@/data/devices";
import { useTheme } from "@/providers/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DevicesScreen() {
  const insets = useSafeAreaInsets();
  const { getThemeColorByVariable } = useTheme();
  const iconColor = getThemeColorByVariable("text-secondary");

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-text">Cihazlar</Text>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => String(item.id)}
        contentContainerClassName="px-4 pb-4 gap-2"
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/sensor-details",
                params: { id: item.id },
              })
            }
          >
            <Card className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-secondary items-center justify-center">
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={iconColor}
                />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-text">
                  {item.name}
                </Text>
                {item.serialNo ? (
                  <Text className="text-xs text-text-secondary mt-0.5">
                    SN: {item.serialNo}
                  </Text>
                ) : null}
              </View>

              <Text className="text-sm text-text-secondary">
                {item.value || "—"}
              </Text>

              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={iconColor}
              />
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}
