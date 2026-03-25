// O jeito que eu fiz esse botao foi com o app tutorial do expo + stackoverflow entao talvez esteja errado.
// Até o momento funciona mas se vc souber fazer mais bonito pode mexer a vontade
// dou o bumbum

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonPProps = {
  label: React.ReactNode;
  onPress: () => void;
  theme?: 'yellow';
  disabled?: boolean;
};

export const ButtonP = ({
  label,
  onPress,
  theme,
  disabled = false,
}: ButtonPProps) => {
  const isYellow = theme === 'yellow';

  return (
    <View style={{ width: '100%' }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.buttonBase,
          isYellow ? styles.yellow : styles.button,
          pressed && !disabled && (isYellow ? styles.yellowHighlight : styles.buttonHighlight),
          disabled && styles.buttonDisabled,
        ]}
      >
        {typeof label === 'string' ? (
          <Text
            style={[
              isYellow ? styles.textTrans : styles.text,
              disabled && styles.textDisabled,
            ]}
          >
            {label}
          </Text>
        ) : (
          label
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2261C1',
  },
  buttonHighlight: {
    backgroundColor: 'hsl(216, 70%, 40%)',
  },
  yellow: {
    backgroundColor: '#F2AA08',
  },
  yellowHighlight: {
    backgroundColor: 'hsl(42, 94%, 55%)',
  },
  buttonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  text: {
    color: '#FAFAFF',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textTrans: {
    color: '#231F20',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textDisabled: {
    color: '#FAFAFF',
  },
});