import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
};

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-steel active:opacity-80',
    text: 'text-navy font-semibold',
  },
  secondary: {
    container: 'bg-mist/30 dark:bg-steel/20 active:opacity-80',
    text: 'text-navy dark:text-mist font-semibold',
  },
  ghost: {
    container: 'active:opacity-60',
    text: 'text-navy dark:text-mist font-medium',
  },
  destructive: {
    container: 'bg-red-600 active:opacity-80',
    text: 'text-white font-semibold',
  },
};

const sizeStyles: Record<Size, { container: string; text: string }> = {
  sm: { container: 'px-3 py-1.5 rounded-lg', text: 'text-sm' },
  md: { container: 'px-4 py-2.5 rounded-xl', text: 'text-base' },
  lg: { container: 'px-6 py-3.5 rounded-xl', text: 'text-lg' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={`items-center justify-center ${v.container} ${s.container} ${disabled ? 'opacity-40' : ''} ${className}`}
    >
      <Text className={`${v.text} ${s.text}`}>{children}</Text>
    </Pressable>
  );
}
