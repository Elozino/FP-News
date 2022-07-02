import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        {/* <Stack.Screen name="" component={}/> */}
        {/* <Stack.Screen name="" component={}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main