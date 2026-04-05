import { View, type ViewProps } from 'react-native';

type CardProps = ViewProps & {
  children: React.ReactNode;
  elevated?: boolean;
};

export function Card({ children, elevated = false, className = '', ...props }: CardProps) {
  return (
    <View
      {...props}
      className={`
        bg-background
        rounded-2xl p-4
        border border-border
        ${elevated ? 'shadow-md shadow-black/10' : ''}
        ${className}
      `}
    >
      {children}
    </View>
  );
}
