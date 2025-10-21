import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";


const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);


export default function TabLayout() {
  
  return (
    
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name="index" options={{ title: "Desenvolvimento", tabBarStyle: {backgroundColor: "#FAFAFF"}, tabBarLabelStyle: {fontFamily: 'Raleway-500', fontSize: 12,}, tabBarIndicatorStyle: {backgroundColor: '#2261C1'}}} />
      <MaterialTopTabs.Screen name="direitos" options={{ title: "Direitos", tabBarStyle: {backgroundColor: "#FAFAFF"}, tabBarLabelStyle: {fontFamily: 'Raleway-500', fontSize: 12}, tabBarIndicatorStyle: {backgroundColor: '#2261C1'}}} />
      <MaterialTopTabs.Screen name="alimentacao" options={{ title: "Alimentos", tabBarStyle: {backgroundColor: "#FAFAFF"}, tabBarLabelStyle: {fontFamily: 'Raleway-500', fontSize: 12}, tabBarIndicatorStyle: {backgroundColor: '#2261C1'}}} />
    </MaterialTopTabs>
  );
}