/* eslint-disable react/no-unstable-nested-components */
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Image } from 'react-native';

import { MyTabBar } from '@/components/tabbar/tab-bar';
import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text, View } from '@/ui';

// eslint-disable-next-line max-lines-per-function
export default function TabLayout() {
  const status = useAuth.use.status();
  console.log(`User is currently ${status}🚨`);
  const [isFirstTime] = useIsFirstTime();
  console.log(`Is it firstTime ${isFirstTime}🥇`);
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <View className="ml-4 flex-row items-center gap-2">
              <Text className="text-lg font-medium">Kathmandu</Text>
            </View>
          ),
          headerRight: ({ tintColor }) => (
            <View className="mr-4 flex-row items-center gap-3">
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={tintColor || 'black'}
              />
              <Ionicons
                name="notifications-outline"
                size={24}
                color={tintColor || 'black'}
              />
              <Pressable onPress={() => {}}>
                <Image
                  className="h-8 w-8 rounded-full"
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqcSD_2qz834cW2RuNWmvAbOMwcZdWSf81Q&s',
                  }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: false,
          tabBarTestID: 'feed-tab',
        }}
      />

      <Tabs.Screen
        name="book"
        options={{
          title: 'BOOK',
          headerShown: false,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
