import { JSX, RefAttributes, useState } from 'react';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import styles from '../app/styleForms';

export const MyDropdown = (props: JSX.IntrinsicAttributes & Pick<DropdownProps<any>, "style" | "fontFamily" | "testID" | "maxHeight" | "minHeight" | "backgroundColor" | "value" | "placeholder" | "iconStyle" | "onChangeText" | "renderLeftIcon" | "renderRightIcon" | "onBlur" | "onFocus" | "accessibilityLabel" | "onChange" | "search" | "renderItem" | "data" | "inverted" | "showsVerticalScrollIndicator" | "itemTestIDField" | "containerStyle" | "placeholderStyle" | "selectedTextStyle" | "selectedTextProps" | "itemContainerStyle" | "itemTextStyle" | "inputSearchStyle" | "iconColor" | "activeColor" | "labelField" | "valueField" | "searchField" | "searchPlaceholder" | "searchPlaceholderTextColor" | "disable" | "autoScroll" | "dropdownPosition" | "flatListProps" | "keyboardAvoiding" | "confirmSelectItem" | "itemAccessibilityLabelField" | "mode" | "closeModalWhenSelectedItem" | "excludeItems" | "excludeSearchItems" | "renderInputSearch" | "searchQuery" | "onConfirmSelectItem"> & RefAttributes<IDropdownRef>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Dropdown
      {...props}
      style={[styles.input, isFocused && {borderWidth: 2, borderColor: '#F2AA08'}]}
      iconStyle={[props.iconStyle, isFocused && {tintColor: '#F2AA08'}]}
      placeholderStyle={styles.exemplo}
      selectedTextStyle={styles.textForm}
      containerStyle={styles.dropdownContainer}
      itemTextStyle={styles.textForm}
      activeColor='	hsla(42, 94%, 49%, 0.5)'
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};