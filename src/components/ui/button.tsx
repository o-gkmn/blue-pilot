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
    container: 'bg-primary active:opacity-80',
    text: 'text-primary-foreground font-semibold',
  },
  secondary: {
    container: 'bg-border/40 active:opacity-80',
    text: 'text-text font-semibold',
  },
  ghost: {
    container: 'active:opacity-60',
    text: 'text-text font-medium',
  },
  destructive: {
    container: 'bg-danger active:opacity-80',
    text: 'text-primary-foreground font-semibold',
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
