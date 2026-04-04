import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { devices } from '@/data/devices';
import { Card } from '@/components/ui';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100 dark:bg-navy">
      <View className="flex-[4] items-center justify-center">
        <Text className="text-xl font-semibold text-navy dark:text-mist">Home</Text>
      </View>
      <ScrollView className="flex-[6]" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap">
          {devices.map((device) => (
            <Pressable
              key={device.id}
              className="w-1/3 aspect-square p-1.5"
              onPress={() => router.push({ pathname: '/sensor-details', params: { id: device.id } })}
            >
              <Card className="bg-white flex-1 justify-between">
                <MaterialCommunityIcons name={device.icon as any} size={24} color="#97acc8" />
                <Text className="text-sm font-semibold text-navy dark:text-mist">{device.name}</Text>
                <Text className="text-sm text-steel mt-1">{device.value}</Text>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
