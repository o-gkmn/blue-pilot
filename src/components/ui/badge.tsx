import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  default: { container: 'bg-border/40', text: 'text-text' },
  success: { container: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-400' },
  warning: { container: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-400' },
  error: { container: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-400' },
  info: { container: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-400' },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const v = variantStyles[variant];
  return (
    <View className={`self-start px-2.5 py-0.5 rounded-full ${v.container}`}>
      <Text className={`text-xs font-medium ${v.text}`}>{children}</Text>
    </View>
  );
}
