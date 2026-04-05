import "../global.css";
import { Theme } from "@/providers/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="sensor-details"
            options={{ presentation: "transparentModal", animation: "fade" }}
          />
        </Stack>
      </Theme>
    </QueryClientProvider>
  );
}
