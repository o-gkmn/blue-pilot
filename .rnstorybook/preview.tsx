import '../src/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { Preview } from '@storybook/react-native';
import { Theme } from '../src/providers/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Theme>
          <Story />
        </Theme>
      </GestureHandlerRootView>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
