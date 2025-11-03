import { useState } from "react";
import MaskInput from 'react-native-mask-input';

export const MyMaskInput = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <MaskInput
      {...props}
      style={[props.style, isFocused && {borderWidth: 2, borderColor: '#F2AA08'}]}
      onBlur={() => [setIsFocused(false), props.onBlurPlus]}
      onFocus={() => setIsFocused(true)}
    />
  );
};