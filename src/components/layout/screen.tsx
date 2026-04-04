import { ScrollView, View, type ViewProps, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
} & (ViewProps | ScrollViewProps);

/**
 * Full-screen container with safe area, optional scroll, and max-width centering.
 * Use this as the root wrapper for every page.
 */
export function Screen({
  children,
  scroll = true,
  className = '',
  contentClassName = '',
  ...props
}: ScreenProps) {
  const Content = scroll ? ScrollView : View;

  return (
    <SafeAreaView className={`flex-1 bg-gray-100 dark:bg-navy ${className}`}>
      <Content
        {...(props as any)}
        {...(scroll
          ? { contentContainerClassName: `w-full max-w-3xl mx-auto px-4 pb-8 ${contentClassName}` }
          : { className: `flex-1 w-full max-w-3xl mx-auto px-4 ${contentClassName}` })}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
}
