import { useWeather } from "@/hooks/use-weather";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Toggle } from "../ui/toggle";
import { WeatherChipBar } from "./weather-chip-bar";

type MapControlsProps = {
  coordinate: [number, number];
  insideYacht: boolean;
  onToggle: (value: boolean) => void;
};

export function MapControls({
  coordinate,
  insideYacht,
  onToggle,
}: MapControlsProps) {
  const { weather } = useWeather(coordinate);

  return (
    <>
      <View className="absolute top-12 left-2 right-2 flex-row items-center justify-between gap-2">
        <WeatherChipBar className="flex-1" weather={weather} />

        <Pressable
          className="bg-foreground p-2 rounded-full shadow-lg border border-gray-200 self-center"
          onPress={() => console.log("Saga sticky buton tiklandi")}
        >
          <Ionicons name="game-controller-outline" size={16} color="#3b82f6" />
        </Pressable>
      </View>

      <View className="absolute left-0 right-0 bottom-12 items-center justify-center">
        <Toggle
          active={insideYacht}
          options={[
            { icon: "shield-check", value: "Protect" },
            { icon: "ferry", value: "Inside Yacht" },
          ]}
          isTextVisible={true}
          onToggle={onToggle}
        />
      </View>
    </>
  );
}
