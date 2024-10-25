import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

const onboardingSteps = [
  {
    icon: 'people-arrows',
    title: 'i am first page',
    description: 'dailey reackj dfadfa dfdfdf dfdfdfdff ',
  },
  {
    icon: 'snowflake',
    title: 'I am second page',
    description: 'dailey reackj dfadfa dfdfdf dfdfdfdff ',
  },
  {
    icon: 'people-arrows',
    title: 'I am third page',
    description: 'dailey reackj dfadfa dfdfdf dfdfdfdff ',
  },
];

// eslint-disable-next-line max-lines-per-function
export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);

  const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);

  const swipes = Gesture.Simultaneous(swipeBack, swipeForward);

  return (
    <SafeAreaView className="flex-1  justify-center bg-[#15141a]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <View className="mx-9 flex-row gap-4">
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            className={` h-1 flex-1 rounded-md`}
            style={{
              backgroundColor: index === screenIndex ? '#cef202' : 'grey',
            }}
          />
        ))}
      </View>

      <GestureDetector gesture={swipes}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="flex-1 p-5"
          key={screenIndex}
        >
          <FontAwesome5
            name={data.icon}
            size={70}
            color="#cef202"
            className="m-12 self-center"
          />
          <View className="mt-auto">
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              className="text-4xl font-bold tracking-wider text-[#fdfdfd]"
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(200)}
              exiting={SlideOutLeft}
              className="text-lg leading-7 text-gray-300"
            >
              {data.description}
            </Animated.Text>
            <View className=" mt-5 flex-row items-center gap-5">
              <Text
                className="p-4 text-base font-bold text-[#fdfdfd]"
                onPress={endOnboarding}
              >
                Skip
              </Text>
              <Pressable
                onPress={onContinue}
                className="flex-1 items-center rounded-3xl bg-[#302e38] "
              >
                <Text className="p-4 text-base font-bold text-[#fdfdfd] ">
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}
