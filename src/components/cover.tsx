/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { Image } from 'react-native';
// TODO: should be updated to simple images
export const Cover = () => {
  return (
    <Image source={require('assets/onboard.jpg')} className="h-4/5 w-full " />
  );
};
