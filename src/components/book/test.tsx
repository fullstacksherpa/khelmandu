import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
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
    title: 'Account Information',
    description: 'Please enter your email, phone number, and password.',
    inputType: 'account', // This indicates we need to handle email, phone, and password
  },
  {
    title: 'Your Name',
    description: 'Please enter your first and last name.',
    inputType: 'name', // This indicates we need to handle first and last name
  },
  {
    title: 'Profile Picture',
    description: 'Please upload a profile picture.',
    inputType: 'image', // This indicates we need to handle an image
  },
];

// eslint-disable-next-line max-lines-per-function
export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: '',
    image: null,
  });

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
    console.log('User Data:', userData);
    // You can now submit or handle the user data as needed
    setScreenIndex(0);
    router.push('/(app)');
  };

  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);

  const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);

  const swipes = Gesture.Simultaneous(swipeBack, swipeForward);

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  // eslint-disable-next-line max-lines-per-function
  const renderInput = () => {
    switch (screenIndex) {
      case 0:
        return (
          <View>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
              onChangeText={(value) => handleInputChange('email', value)}
              value={userData.email}
            />
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
              onChangeText={(value) => handleInputChange('phone', value)}
              value={userData.phone}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 5,
                padding: 10,
              }}
              onChangeText={(value) => handleInputChange('password', value)}
              value={userData.password}
            />
          </View>
        );
      case 1:
        return (
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="First Name"
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
              onChangeText={(value) => handleInputChange('firstName', value)}
              value={userData.firstName}
            />
            <TextInput
              placeholder="Last Name"
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 5,
                padding: 10,
              }}
              onChangeText={(value) => handleInputChange('lastName', value)}
              value={userData.lastName}
            />
          </View>
        );
      case 2:
        return (
          <View style={{ marginTop: 20 }}>
            <Pressable
              onPress={() => {
                /* Handle image picker here */
              }}
            >
              <Text style={{ color: '#cef202', fontSize: 18 }}>
                Upload Image
              </Text>
            </Pressable>
            {userData.image && (
              <Image
                source={{ uri: userData.image }} // Assuming `userData.image` is a URI
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#FFFAFA]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <View className="mx-9 flex-row gap-4">
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            className={`h-1 flex-1 rounded-md`}
            style={{
              backgroundColor: index === screenIndex ? '#1ec921' : 'grey',
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
          <View className="mt-16">
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              className="text-4xl font-bold tracking-wider text-black"
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(200)}
              exiting={SlideOutLeft}
              className="text-lg leading-7 text-gray-500"
            >
              {data.description}
            </Animated.Text>
            {renderInput()}
            <View className="mt-20 flex-row items-center gap-16">
              <Pressable onPress={onBack} className=" items-center ">
                <Ionicons name="arrow-back" size={30} color="black" />
              </Pressable>
              <Pressable
                onPress={onContinue}
                className="flex-1 items-center rounded-3xl bg-['#1ec921'] "
              >
                <Text className="p-4 text-base font-bold leading-5 tracking-widest text-[#fdfdfd] ">
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
