import { View } from 'react-native';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  return (
    <View
      className={`
        bg-mist dark:bg-steel/30
        ${orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch'}
        ${className}
      `}
    />
  );
}
