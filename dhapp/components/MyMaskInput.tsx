import { JSX, RefAttributes, useState } from "react";
import { TextInput } from "react-native";
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

export const MyMaskInput = (props: JSX.IntrinsicAttributes & MaskInputProps & RefAttributes<TextInput>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <MaskInput
      {...props}
      style={[props.style, isFocused && {borderWidth: 2, borderColor: '#F2AA08'}]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};