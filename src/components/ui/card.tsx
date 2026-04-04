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
        bg-white dark:bg-navy
        rounded-2xl p-4
        border border-mist/50 dark:border-steel/20
        ${elevated ? 'shadow-md shadow-black/10' : ''}
        ${className}
      `}
    >
      {children}
    </View>
  );
}
