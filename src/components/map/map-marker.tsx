import { MarkerView } from "@maplibre/maplibre-react-native";
import { Image, View } from "react-native";

type MapMarkerProps = {
  coordinate: [number, number];
  insideYacht: boolean;
};

export function MapMarker({ coordinate, insideYacht }: MapMarkerProps) {
  return (
    <MarkerView coordinate={coordinate}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            insideYacht
              ? require("@/assets/images/icons/helm.png")
              : require("@/assets/images/icons/anchor.png")
          }
          style={{ width: 32, height: 32 }}
          resizeMode="contain"
        />
      </View>
    </MarkerView>
  );
}
