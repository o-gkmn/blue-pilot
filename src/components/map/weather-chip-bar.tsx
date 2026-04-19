import { WeatherData } from "@/types/weather";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "../ui/chip";

interface WeatherChipBarProps {
  weather: WeatherData;
  className?: string;
}

export function WeatherChipBar({ weather, className }: WeatherChipBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
    >
      <View className="flex-row gap-2">
        <Chip
          iconSource={require("@/assets/images/icons/sun.png")}
          text="Hava"
          value={`${weather.temperature}°C`}
        />
        <Chip
          iconSource={require("@/assets/images/icons/windsock.png")}
          text="Rüzgar"
          value={`${weather.windSpeed}kn ${weather.windDirection}°A`}
        />
        <Chip
          iconSource={require("@/assets/images/icons/water-level.png")}
          text="Derinlik"
          value={`${weather.depth}m`}
        />
        <Chip
          iconSource={require("@/assets/images/icons/barometer.png")}
          text="Atm. Bas."
          value={`${weather.pressure} hPa`}
        />
        <Chip
          iconSource={require("@/assets/images/icons/water-temperature.png")}
          text="Deniz Sıc."
          value={`${weather.seaTemperature}°C`}
        />
      </View>
    </ScrollView>
  );
}
