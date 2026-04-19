import { MAP_STYLE } from "@/constants/map-style";
import { useMapAnimation } from "@/hooks/use-map-animation";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera,
  MapView as LibreMapView,
} from "@maplibre/maplibre-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapControls } from "./map-controls";
import { MapMarker } from "./map-marker";

const DEFAULT_COORDINATE: [number, number] = [29.2376, 40.8723];
// 40.85, 29.2
// 29.2, 40.85
// 29.2375, 40.8722

type MapViewProps = {
  insideYacht: boolean;
  onToggle: (value: boolean) => void;
  coordinate?: [number, number];
};

export function MapView({
  insideYacht,
  onToggle,
  coordinate = DEFAULT_COORDINATE,
}: MapViewProps) {
  const insets = useSafeAreaInsets();
  const { fullscreen, animatedStyle, expand, collapse, onPlaceholderLayout } =
    useMapAnimation();

  return (
    <>
      {/* Placeholder — reserves space in layout, invisible */}
      <View
        className="flex-[4]"
        onLayout={(e) => {
          const { x, y, width, height } = e.nativeEvent.layout;
          onPlaceholderLayout(x, y, width, height);
        }}
      />

      {/* Single map instance — never unmounts, animates position/size */}
      <Animated.View style={animatedStyle}>
        <Pressable
          className="absolute inset-0"
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
              centerCoordinate={coordinate}
              animationMode="flyTo"
              animationDuration={1000}
            />
            <MapMarker coordinate={coordinate} insideYacht={insideYacht} />
          </LibreMapView>
        </Pressable>

        {fullscreen && (
          <Pressable
            className="absolute right-4 w-9 h-9 rounded-full bg-black/50 items-center justify-center"
            style={{ top: insets.top + 12 }}
            onPress={collapse}
          >
            <Ionicons name="close" size={20} color="white" />
          </Pressable>
        )}

        {!fullscreen && (
          <MapControls
            coordinate={coordinate}
            insideYacht={insideYacht}
            onToggle={onToggle}
          />
        )}

        <View className="absolute bottom-4 left-0 right-0 items-center justify-center">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("@/assets/images/icons/turkey.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Text className="text-white">Mavi Kaptan</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
}
