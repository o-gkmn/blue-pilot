import "./src/global.css";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
  const isStorybookEnabled =
    process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

  if (isStorybookEnabled) {
    // Require the Storybook UI dynamically
    const StorybookUI = require("./.rnstorybook").default;
    return (
      <GestureHandlerRootView style={styles.container}>
        <StorybookUI />
      </GestureHandlerRootView>
    );
  }

  // Use the Expo Router entry point
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

registerRootComponent(App);
export default App;
