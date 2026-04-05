import { useTheme } from '@/providers/theme';
import { Card } from '@/components/ui';
import { devices } from '@/data/devices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function SensorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const device = devices.find((d) => d.id === Number(id));
  const { getThemeColorByVariable } = useTheme();
  const iconColor = getThemeColorByVariable('text-secondary');

  if (!device) {
    return (
      <View className="flex-1 bg-background rounded-t-3xl items-center justify-center">
        <Text className="text-text">Sensor not found.</Text>
      </View>
    );
  }

  return (
    <BlurView intensity={70} tint="dark" className="flex-1 justify-end">
      <Pressable className="absolute inset-0" onPress={() => router.back()} />
      <View className="bg-background rounded-t-3xl overflow-hidden">
        {/* Drag handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-10 h-1 rounded-full bg-border" />
        </View>

        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Text className="text-lg font-semibold text-text flex-1">{device.name}</Text>
          <Pressable onPress={() => router.back()} className="p-1">
            <MaterialCommunityIcons name="close" size={22} color={iconColor} />
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="px-4 pt-2 pb-10 gap-4">
          {/* Icon + status card */}
          <Card elevated className="items-center py-8 gap-3">
            <MaterialCommunityIcons name={device.icon as any} size={56} color={iconColor} />
            <Text className="text-2xl font-bold text-text">{device.value || '—'}</Text>
            <Text className="text-sm text-text-secondary">{device.name}</Text>
          </Card>

          {/* Details */}
          <Card>
            <Text className="text-xs font-semibold text-text-secondary uppercase mb-3 tracking-widest">Cihaz Bilgileri</Text>
            <View className="gap-3">
              <Row label="Seri No" value={device.serialNo || '—'} />
              <View className="h-px bg-border" />
              <Row label="Model No" value={device.modelNo || '—'} />
            </View>
          </Card>
        </ScrollView>
      </View>
    </BlurView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-sm text-text-secondary">{label}</Text>
      <Text className="text-sm font-medium text-text">{value}</Text>
    </View>
  );
}
