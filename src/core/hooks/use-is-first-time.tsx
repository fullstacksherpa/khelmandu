import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, storage);
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const;
  }
  return [isFirstTime, setIsFirstTime] as const;
};

/*
Internal Logic of the Hook
Using useMMKVBoolean:


const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, storage)'

This line uses the useMMKVBoolean hook, which takes two arguments: the key (IS_FIRST_TIME) and the storage instance (storage).

It returns an array containing:
isFirstTime: The current value stored in MMKV associated with the key IS_FIRST_TIME. This value will be either true, false, or undefined if it hasn't been set yet.
setIsFirstTime: A function that can be used to update the stored boolean value.
Handling undefined Value:

javascript
Copy code
if (isFirstTime === undefined) {
  return [true, setIsFirstTime] as const;
}
This conditional checks if isFirstTime is undefined. If it is, this means that the key IS_FIRST_TIME has not been set in storage yet (which typically implies the user is using the app for the first time).
If it's undefined, the function returns an array containing:
true: Signifying that it's the user's first time using the app.
setIsFirstTime: The function to set the boolean value in MMKV.
Returning the Current Value:

javascript
Copy code
return [isFirstTime, setIsFirstTime] as const;
If isFirstTime is not undefined, it means that the value exists in storage (either true or false).
The hook returns the current value (isFirstTime) and the setter function (setIsFirstTime) so that the component using this hook can both read and modify the value.
4. Return Type
The as const assertion is used to indicate that the returned array is a tuple with fixed types. This allows TypeScript to infer that the return value will always be an array containing exactly two elements: a boolean and a setter function.

*/
