import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

// eslint-disable-next-line max-lines-per-function
const VenueCard = ({ item }) => {
  const router = useRouter();
  // const navigation = useNavigation();
  return (
    <View style={{ margin: 15 }}>
      <Pressable
        // onPress={() =>
        //   navigation.navigate('Venue', {
        //     name: item.name,
        //     image: item.newImage,
        //     sportsAvailable: item.sportsAvailable,
        //     rating: item.rating,
        //     timings: item.timings,
        //     address: item.address,
        //     location: item.location,
        //     bookings: item.bookings,
        //   })
        // }
        onPress={() => {
          router.push('/venue-info-screen');
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={{ uri: item.image }}
          />
        </View>

        <View style={{ paddingVertical: 12, paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              {item.name.length > 40
                ? item.name.substring(0, 40) + '...'
                : item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: 'green',
                padding: 6,
                borderRadius: 6,
              }}
            >
              <AntDesign name="star" size={20} color="white" />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {item.rating}
              </Text>
            </View>
          </View>

          <Text style={{ color: 'gray' }}>
            {item?.address.length > 40
              ? item?.address.substring(0, 40) + '...'
              : item?.address}
          </Text>

          <View
            style={{
              height: 1,
              borderWidth: 0.6,
              borderColor: '#E0E0E0',
              marginVertical: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>Upto 10% Off</Text>

            <Text style={{ fontWeight: '500' }}>INR 25O Onwards</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default VenueCard;
