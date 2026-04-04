import { View, type ViewProps } from 'react-native';

type RowProps = ViewProps & {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
};

const gapClass: Record<NonNullable<RowProps['gap']>, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignClass: Record<NonNullable<RowProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClass: Record<NonNullable<RowProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

/**
 * Horizontal flex container.
 */
export function Row({
  children,
  gap = 'sm',
  align = 'center',
  justify = 'start',
  className = '',
  ...props
}: RowProps) {
  return (
    <View
      {...props}
      className={`flex-row ${gapClass[gap]} ${alignClass[align]} ${justifyClass[justify]} ${className}`}
    >
      {children}
    </View>
  );
}
