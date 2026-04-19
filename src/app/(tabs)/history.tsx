import { Card } from "@/components/ui";
import { history } from "@/data/history";
import { useTheme } from "@/providers/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const typeColors = {
  alert: "text-red-500",
  warning: "text-yellow-500",
  info: "text-primary",
};

const typeDots = {
  alert: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-primary",
};

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { getThemeColorByVariable } = useTheme();
  const iconColor = getThemeColorByVariable("text-secondary");

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-text">Geçmiş</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pb-4 gap-2"
        renderItem={({ item }) => (
          <Card className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-secondary items-center justify-center">
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color={iconColor}
              />
            </View>

            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <View className={`w-2 h-2 rounded-full ${typeDots[item.type]}`} />
                <Text className="text-sm font-semibold text-text">{item.title}</Text>
              </View>
              <Text className="text-xs text-text-secondary mt-0.5">
                {item.description}
              </Text>
            </View>

            <Text className="text-xs text-text-secondary">{item.timestamp}</Text>
          </Card>
        )}
      />
    </View>
  );
}
