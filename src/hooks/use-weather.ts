import { weatherApi } from "@/api/weather.api";
import { WeatherData } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

export function useWeather(coordinate: [number, number]) {
  const [longitude, latitude] = coordinate;

  const {
    data: forecast,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useQuery({
    queryKey: ["weather", "forecast", latitude, longitude],
    queryFn: () =>
      weatherApi.forecast({
        latitude,
        longitude,
        wind_speed_unit: "kn",
        current: [
          "temperature_2m",
          "wind_speed_10m",
          "wind_direction_10m",
          "pressure_msl",
        ],
      }),
  });

  const {
    data: marine,
    isLoading: isMarineLoading,
    error: marineError,
  } = useQuery({
    queryKey: ["weather", "marine", latitude, longitude],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("marine", latitude, longitude);

      const response = await weatherApi.marine({
        latitude,
        longitude,
        current: ["sea_surface_temperature", "sea_level_height_msl"],
      });

      console.log("marine", response);

      return response;
    },
  });

  const weather: WeatherData = {
    temperature: (forecast?.current?.temperature_2m as number) ?? 0,
    windSpeed: (forecast?.current?.wind_speed_10m as number) ?? 0,
    windDirection: (forecast?.current?.wind_direction_10m as number) ?? 0,
    pressure: (forecast?.current?.pressure_msl as number) ?? 0,
    seaTemperature: (marine?.current?.sea_surface_temperature as number) ?? 0,
    depth: (marine?.current?.sea_level_height_msl as number) ?? 0,
  };

  return {
    weather,
    isLoading: isForecastLoading || isMarineLoading,
    error: forecastError || marineError,
  };
}
