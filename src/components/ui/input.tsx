import { useTheme } from '@/providers/theme';
import { TextInput, Text, View, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className = '', placeholderTextColor, ...props }: InputProps) {
  const { getThemeColorByVariable } = useTheme();

  return (
    <View className="gap-1">
      {label && (
        <Text className="text-sm font-medium text-text-secondary">{label}</Text>
      )}
      <TextInput
        {...props}
        className={`
          border rounded-xl px-4 py-3 text-base
          text-text
          bg-background
          ${error ? 'border-danger' : 'border-border'}
          focus:border-primary
          ${className}
        `}
        placeholderTextColor={placeholderTextColor ?? getThemeColorByVariable('text-placeholder')}
      />
      {error && <Text className="text-sm text-danger">{error}</Text>}
      {hint && !error && <Text className="text-sm text-text-secondary">{hint}</Text>}
    </View>
  );
}
