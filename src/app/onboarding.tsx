import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="-mt-10 justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">Khelmandu</Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          Create or Join matches and reclaim your focus !!
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          ⚽️ Easily check venue availability for any game.{' '}
        </Text>
        <Text className="my-1 text-left text-lg">
          ⏱️ Book your available venue effortlessly.
        </Text>
        <Text className="my-1 text-left text-lg">
          💵 Unlock exclusive offers available.
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's join "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
