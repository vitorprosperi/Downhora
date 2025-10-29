import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const dataFilter = [
    {label: 'Sem filtro', value: 'padrao'},
    {label: 'Exames anteriores', value: 'datasPassadas'},
    {label: 'Exames próximos', value: 'datasFuturas'}
];

export const FilterDropdown = (props) => {
    const [value, setValue] = useState(null)

    return (
        <Dropdown
        style={styles.dropdown}
        data={dataFilter}
        labelField="label"
        valueField="value"
        value={'padrao'}
        selectedTextStyle={styles.selectedText}
        onChange={item => {
          setValue(item.value);
        }}
        ></Dropdown>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      minWidth: 150, 
      backgroundColor: '#EEEEEE',
      borderRadius: 22,
      paddingHorizontal: 8,
    },
    selectedText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
    }
})