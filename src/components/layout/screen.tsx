import { ScrollView, View, type ViewProps, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
  viewProps?: Omit<ViewProps, 'children'>;
};

/**
 * Full-screen container with safe area, optional scroll, and max-width centering.
 * Use this as the root wrapper for every page.
 */
export function Screen({
  children,
  scroll = true,
  className = '',
  contentClassName = '',
  scrollViewProps,
  viewProps,
}: ScreenProps) {
  return (
    <SafeAreaView className={`flex-1 bg-background ${className}`}>
      {scroll ? (
        <ScrollView
          {...scrollViewProps}
          contentContainerClassName={`w-full max-w-3xl mx-auto px-4 pb-8 ${contentClassName}`}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          {...viewProps}
          className={`flex-1 w-full max-w-3xl mx-auto px-4 ${contentClassName}`}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
