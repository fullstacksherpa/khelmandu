import { getToken, removeToken, setToken } from '@/core/auth/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
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
    title: 'Complete Your Profile',
    description: 'What would you like your team member to call you ?',
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

  type UserData = {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    image: string | null; // or string if you prefer to avoid null
  };

  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];
  console.log(userData);

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
      return;
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

  const handleInputChange = (key: keyof UserData, value: string | null) => {
    setUserData({ ...userData, [key]: value });
  };

  const registerUser = async () => {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phone);
    formData.append('password', userData.password);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);

    // Assuming `userData.image` is the URI of the image selected
    if (userData.image) {
      formData.append('image', {
        uri: userData.image,
        type: 'image/jpeg', // Change based on your image type
        name: 'profile.jpg', // Set a name for the file
      } as any);
    }

    try {
      const response = await axios
        .post('http://localhost:8000/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          const token = response.data.data.token;
          removeToken();
          setToken(token);
        });
      console.log('Registration success:', response);
      const TOKKEN = getToken();
      console.log(TOKKEN);
      if (TOKKEN) {
        router.push('/(app)');
      }
    } catch (error) {
      console.log('Error during registration:', error);
    }
  };
  // const registerUser = async () => {
  //   try {
  //     const response = await axios
  //       .post('http://localhost:8000/auth/register', userData)
  //       .then((response) => {
  //         console.log(response);
  //         const token = response.data.token;
  //         setToken(token);
  //       });
  //   } catch (error) {
  //     console.log('error while executing registerUser', error);
  //   }
  // };

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
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ marginVertical: 25 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderColor: 'green',
                    borderWidth: 2,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: userData.image ? userData.image : images[0]?.image,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 25,
                  justifyContent: 'center',
                }}
              >
                {images?.map((item, index) => (
                  <Pressable
                    onPress={() => handleInputChange('image', item?.image)}
                    style={{ margin: 10, gap: 10 }}
                    key={index}
                  >
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        borderColor:
                          userData.image === item?.image
                            ? 'green'
                            : 'transparent',
                        borderWidth: 2,
                        resizeMode: 'contain',
                      }}
                      source={{ uri: item.image }}
                    />
                  </Pressable>
                ))}
              </View>

              <Text
                style={{ textAlign: 'center', color: 'gray', fontSize: 17 }}
              >
                OR
              </Text>
              <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <View>
                  <Text style={{ fontSize: 16, color: 'gray' }}>
                    Enter Image link
                  </Text>

                  <TextInput
                    value={userData.image ? userData.image : images[0]?.image}
                    onChangeText={(value) => handleInputChange('image', value)}
                    placeholder="Image link"
                    style={{
                      padding: 18,
                      borderColor: '#D0D0D0',
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  />
                </View>
              </View>
            </View>
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
          </View>
        </Animated.View>
      </GestureDetector>
      <View className="mb-8 mt-auto flex-row items-center gap-16 px-6">
        <Pressable
          onPress={onBack}
          className="items-center"
          disabled={screenIndex === 0}
          style={{ opacity: screenIndex === 0 ? 0.5 : 1 }} // Lower opacity when disabled
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color={screenIndex === 0 ? 'grey' : 'black'} // Gray color when disabled
          />
        </Pressable>

        <Pressable
          onPress={screenIndex === 2 ? registerUser : onContinue}
          className="flex-1 items-center rounded-3xl bg-['#1ec921'] "
        >
          <Text className="p-4 text-base font-bold leading-5 tracking-widest text-[#fdfdfd] ">
            {screenIndex === 2 ? 'Finish Registering' : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
