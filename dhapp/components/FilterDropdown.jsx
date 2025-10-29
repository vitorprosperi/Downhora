import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const dataFilter = [
    {label: 'Sem filtro', value: 'padrao'},
    {label: 'Exames anteriores', value: 'datasPassadas'},
    {label: 'Exames próximos', value: 'datasFuturas'}
];

export const FilterDropdown = (props) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
        <Dropdown
        {...props}
        style={[styles.dropdown, isFocus && {borderColor: '#F2AA08'} ]}
        data={dataFilter}
        labelField="label"
        valueField="value"
        value={'padrao'}
        renderRightIcon={() => <View></View>}
        selectedTextStyle={styles.selectedText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ></Dropdown>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 5,
      height: 50,
      width: '120',
      borderColor: 'hsl(216 69.7% 62.3%)',
      borderWidth: 0.8,
      backgroundColor: '#fff',
      borderRadius: 22,
      paddingHorizontal: 8,
    },
    selectedText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
    }
})