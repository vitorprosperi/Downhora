import { JSX, useState } from "react";
import { TextInput, TextInputProps, } from "react-native";

export const MyInput = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<TextInput> & Readonly<TextInputProps>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      style={[props.style, isFocused && {borderWidth: 2, borderColor: '#2261C1'}]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};