import { weatherApi } from "@/api/weather.api";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera,
  MapView as LibreMapView,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toggle } from "./ui/toggle";
import { WeatherChipBar } from "./weather-chip-bar";

const MAP_STYLE = {
  version: 8,
  sources: {
    "map-source": {
      type: "raster",
      tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "map-layer",
      type: "raster",
      source: "map-source",
    },
  ],
};

const COORDINATE: [number, number] = [29.2375, 40.8722];
const DURATION = 350;

type Layout = { x: number; y: number; width: number; height: number };

type MapViewProps = {
  insideYacht: boolean;
  onToggle: (value: boolean) => void;
};

export function MapView({ insideYacht, onToggle }: MapViewProps) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [fullscreen, setFullscreen] = useState(false);
  const previewLayout = useRef<Layout | null>(null);

  const animTop = useSharedValue(0);
  const animLeft = useSharedValue(0);
  const animWidth = useSharedValue(0);
  const animHeight = useSharedValue(0);
  const animZIndex = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: animTop.value,
    left: animLeft.value,
    width: animWidth.value,
    height: animHeight.value,
    zIndex: animZIndex.value,
    overflow: "hidden",
  }));

  const expand = () => {
    animZIndex.value = 99;
    animTop.value = withTiming(0, { duration: DURATION });
    animLeft.value = withTiming(0, { duration: DURATION });
    animWidth.value = withTiming(screenWidth, { duration: DURATION });
    animHeight.value = withTiming(screenHeight, { duration: DURATION });
    setFullscreen(true);
  };

  const collapse = () => {
    const layout = previewLayout.current;
    if (!layout) return;
    animTop.value = withTiming(layout.y, { duration: DURATION });
    animLeft.value = withTiming(layout.x, { duration: DURATION });
    animWidth.value = withTiming(layout.width, { duration: DURATION });
    animHeight.value = withTiming(layout.height, { duration: DURATION });
    setTimeout(() => {
      animZIndex.value = 1;
      setFullscreen(false);
    }, DURATION);
  };

  const fetchWeather = async () => {
    const data = await weatherApi.forecast({
      latitude: 29.2375,
      longitude: 40.8722,
      wind_speed_unit: "kn",
      current: [
        "temperature_2m",
        "wind_speed_10m",
        "wind_direction_10m",
        "pressure_msl",
      ],
    });
    console.log(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      {/* Placeholder — reserves space in layout, invisible */}
      <View
        style={styles.placeholder}
        onLayout={(e) => {
          const { x, y, width, height } = e.nativeEvent.layout;
          previewLayout.current = { x, y, width, height };
          if (!fullscreen) {
            animTop.value = y;
            animLeft.value = x;
            animWidth.value = width;
            animHeight.value = height;
          }
        }}
      />

      {/* Single map instance — never unmounts, animates position/size */}
      <Animated.View style={animatedStyle}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={!fullscreen ? expand : undefined}
        >
          <LibreMapView
            style={{ flex: 1 }}
            mapStyle={JSON.stringify(MAP_STYLE)}
            logoEnabled={false}
            attributionEnabled={false}
            compassEnabled={false}
          >
            <Camera
              zoomLevel={insideYacht ? 13 : 14}
              centerCoordinate={COORDINATE}
              animationMode="flyTo"
              animationDuration={1000}
            />
            <MarkerView coordinate={COORDINATE}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={
                    insideYacht
                      ? require("@/assets/images/icons/helm.png")
                      : require("@/assets/images/icons/anchor.png")
                  }
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  resizeMode="contain"
                />
              </View>
            </MarkerView>
          </LibreMapView>
        </Pressable>

        {fullscreen && (
          <Pressable
            style={[styles.closeButton, { top: insets.top + 12 }]}
            onPress={collapse}
          >
            <Ionicons name="close" size={20} color="white" />
          </Pressable>
        )}

        <View
          className={`absolute top-12 left-2 right-2 flex-row items-center justify-between gap-2 ${fullscreen ? "hidden" : ""}`}
        >
          <WeatherChipBar
            className="flex-1"
            weather={{
              temperature: 18,
              windSpeed: 12,
              windDirection: 180,
              depth: 10,
              pressure: 1013,
              seaTemperature: 18,
            }}
          />

          <Pressable
            className="bg-foreground p-2 rounded-full shadow-lg border border-gray-200 self-center"
            onPress={() => console.log("Saga sticky buton tiklandi")}
          >
            <Ionicons
              name="game-controller-outline"
              size={16}
              color="#3b82f6"
            />
          </Pressable>
        </View>

        <View
          className={`absolute left-0 right-0 bottom-12 items-center justify-center ${fullscreen ? "hidden" : ""}`}
        >
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

        <View className="absolute bottom-4 left-0 right-0 items-center justify-center">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("@/assets/images/icons/turkey.png")}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
            <Text className="text-white">Mavi Kaptan</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  placeholder: { flex: 4 },
  closeButton: {
    position: "absolute",
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
