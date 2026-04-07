import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export const PassInput = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { style, onBlur, onFocus, ...restProps } = props;

  return (
    <View style={styles.wrapper}>
      <TextInput
        {...restProps}
        style={[style, isFocused && styles.focused, styles.input]}
        secureTextEntry={!isPasswordVisible}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setIsPasswordVisible((prev) => !prev)}
        accessibilityLabel={
          isPasswordVisible ? "Hide password" : "Show password"
        }
      >
        <MaterialCommunityIcons
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={22}
          color={isFocused ? "#F2AA08" : "#888"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  focused: {
    borderWidth: 2,
    borderColor: "#F2AA08",
  },
  input: {
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});
