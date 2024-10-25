import React from 'react';
import type { TextProps } from 'react-native';
import { Text as NNText } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props extends TextProps {
  className?: string;
}

export const Text = ({ className = '', children, ...props }: Props) => {
  const textStyle = React.useMemo(
    () =>
      twMerge(
        'text-base text-black  dark:text-white  font-inter font-normal',
        className,
      ),
    [className],
  );

  return (
    <NNText className={textStyle} {...props}>
      {children}
    </NNText>
  );
};
