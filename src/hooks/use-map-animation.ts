import { useCallback, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DURATION = 350;

type Layout = { x: number; y: number; width: number; height: number };

export function useMapAnimation() {
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

  const expand = useCallback(() => {
    animZIndex.value = 99;
    animTop.value = withTiming(0, { duration: DURATION });
    animLeft.value = withTiming(0, { duration: DURATION });
    animWidth.value = withTiming(screenWidth, { duration: DURATION });
    animHeight.value = withTiming(screenHeight, { duration: DURATION });
    setFullscreen(true);
  }, [screenWidth, screenHeight, animZIndex, animTop, animLeft, animWidth, animHeight]);

  const collapse = useCallback(() => {
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
  }, [animTop, animLeft, animWidth, animHeight, animZIndex]);

  const onPlaceholderLayout = useCallback(
    (x: number, y: number, width: number, height: number) => {
      previewLayout.current = { x, y, width, height };
      if (!fullscreen) {
        animTop.value = y;
        animLeft.value = x;
        animWidth.value = width;
        animHeight.value = height;
      }
    },
    [fullscreen, animTop, animLeft, animWidth, animHeight],
  );

  return { fullscreen, animatedStyle, expand, collapse, onPlaceholderLayout };
}
