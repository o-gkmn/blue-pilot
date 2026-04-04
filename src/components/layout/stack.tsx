import { View, type ViewProps } from 'react-native';

type StackProps = ViewProps & {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const gapClass: Record<NonNullable<StackProps['gap']>, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

/**
 * Vertical flex container with a consistent gap between children.
 */
export function Stack({ children, gap = 'md', className = '', ...props }: StackProps) {
  return (
    <View {...props} className={`flex-col ${gapClass[gap]} ${className}`}>
      {children}
    </View>
  );
}
