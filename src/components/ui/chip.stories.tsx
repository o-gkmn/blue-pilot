// src/components/Chip/Chip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Chip } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
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
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

// Sadece icon
export const Default: Story = {
  args: {
    iconSource: require("../../../assets/images/icons/water-temperature.png"),
    onPress: () => alert("pressed"),
  },
};

// Icon + text
export const WithText: Story = {
  args: {
    iconSource: require("../../../assets/images/icons/windsock.png"),
    text: "Rüzgar",
    onPress: () => alert("pressed"),
  },
};

// Icon + text + value
export const WithValue: Story = {
  args: {
    iconSource: require("../../../assets/images/icons/water-temperature.png"),
    text: "Deniz Sıcaklığı",
    value: "18°C",
    onPress: () => alert("pressed"),
  },
};
