import { TextInput, Text, View, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <View className="gap-1">
      {label && (
        <Text className="text-sm font-medium text-navy/70 dark:text-steel">{label}</Text>
      )}
      <TextInput
        {...props}
        className={`
          border rounded-xl px-4 py-3 text-base
          text-navy dark:text-mist
          bg-white dark:bg-navy
          ${error ? 'border-red-500' : 'border-mist dark:border-steel/30'}
          focus:border-steel
          ${className}
        `}
        placeholderTextColor="#97acc8"
      />
      {error && <Text className="text-sm text-red-500">{error}</Text>}
      {hint && !error && <Text className="text-sm text-steel dark:text-steel">{hint}</Text>}
    </View>
  );
}
