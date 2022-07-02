import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Register from './screens/Register';
import RegisterAuth from './screens/RegisterAuth';
import Login from './screens/Login';
import Home from './screens/Home';
import NewsDetails from './screens/NewsDetails';

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterAuth" component={RegisterAuth} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewsDetails" component={NewsDetails}/>
        {/* <Stack.Screen name="" component={}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
