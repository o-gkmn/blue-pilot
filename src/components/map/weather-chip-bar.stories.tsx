import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { WeatherChipBar } from "./weather-chip-bar";

const meta: Meta<typeof WeatherChipBar> = {
  title: "Components/WeatherChipBar",
  component: WeatherChipBar,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
          alignItems: "flex-start",
        }}
      >
        <Story />
      </View>
    ),
  ],
  args: {
    weather: {
      temperature: 18,
      windSpeed: 12,
      windDirection: 180,
      depth: 10,
      pressure: 1013,
      seaTemperature: 18,
    },
  },
};

export default meta;

type Story = StoryObj<typeof WeatherChipBar>;

export const Default: Story = {};
