import { useState } from "react";
import { StyleSheet } from "react-native";
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
        iconColor="#FFF"
        selectedTextStyle={styles.selectedText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 5,
      height: 50,
      width: '120',
      backgroundColor: '#2261C1',
      borderRadius: 22,
      paddingHorizontal: 8,
      
    },
    selectedText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#FFF'
    }
})