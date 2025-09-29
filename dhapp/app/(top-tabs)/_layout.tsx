// app/(top-tabs)/_layout.tsx
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
      <MaterialTopTabs.Screen name="index" options={{ title: "Desenvolvimento", tabBarStyle: {backgroundColor: "#FAFAFF"} }} />
      <MaterialTopTabs.Screen name="direitos" options={{ title: "Direitos", tabBarStyle: {backgroundColor: "#FAFAFF"}}} />
    </MaterialTopTabs>
  );
}