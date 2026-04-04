import { Card } from '@/components/ui';
import { devices } from '@/data/devices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function SensorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const device = devices.find((d) => d.id === Number(id));

  if (!device) {
    return (
      <View className="flex-1 bg-gray-100 dark:bg-navy rounded-t-3xl items-center justify-center">
        <Text className="text-navy dark:text-mist">Sensor not found.</Text>
      </View>
    );
  }

  return (
    <BlurView intensity={70} tint="dark" className="flex-1 justify-end">
      <Pressable className="absolute inset-0" onPress={() => router.back()} />
      <View className="bg-gray-100 dark:bg-navy rounded-t-3xl overflow-hidden">
        {/* Drag handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-10 h-1 rounded-full bg-mist dark:bg-steel/40" />
        </View>

        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Text className="text-lg font-semibold text-navy dark:text-mist flex-1">{device.name}</Text>
          <Pressable onPress={() => router.back()} className="p-1">
            <MaterialCommunityIcons name="close" size={22} color="#97acc8" />
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="px-4 pt-2 pb-10 gap-4">
          {/* Icon + status card */}
          <Card elevated className="items-center py-8 gap-3">
            <MaterialCommunityIcons name={device.icon as any} size={56} color="#97acc8" />
            <Text className="text-2xl font-bold text-navy dark:text-mist">{device.value || '—'}</Text>
            <Text className="text-sm text-steel">{device.name}</Text>
          </Card>

          {/* Details */}
          <Card>
            <Text className="text-xs font-semibold text-steel uppercase mb-3 tracking-widest">Cihaz Bilgileri</Text>
            <View className="gap-3">
              <Row label="Seri No" value={device.serialNo || '—'} />
              <View className="h-px bg-mist/40 dark:bg-steel/20" />
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
      <Text className="text-sm text-steel">{label}</Text>
      <Text className="text-sm font-medium text-navy dark:text-mist">{value}</Text>
    </View>
  );
}
