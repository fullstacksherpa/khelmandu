import AntDesign from '@expo/vector-icons/AntDesign';
import * as React from 'react';

import { Pressable, Text, View } from '@/ui';

type ItemProps = {
  text: string;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const Item = ({ text, value, icon, onPress }: ItemProps) => {
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="flex-1 flex-row items-center justify-between px-4 py-2"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text>{text}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-red-800 dark:text-white">{value}</Text>
        {isPressable && (
          <View className="pl-2">
            <AntDesign name="arrowright" size={15} color="black" />
          </View>
        )}
      </View>
    </Pressable>
  );
};
