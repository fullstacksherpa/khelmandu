/* eslint-disable react/no-unstable-nested-components */
import Ionicons from '@expo/vector-icons/AntDesign';
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Image } from 'react-native';

import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text, View } from '@/ui';
import {
  Feed as FeedIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@/ui/icons';

// eslint-disable-next-line max-lines-per-function
export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
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
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <View className="ml-4 flex-row items-center gap-2">
              <Text className="text-lg font-medium">Dasarahalli</Text>
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
                    uri: 'https://accounts.google.com/SignOutOptions?hl=en&continue=https://mail.google.com/mail&service=mail&ec=GBRAFw',
                  }}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: 'Style',
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};
