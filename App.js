import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from './Screens/Chat';
import LoginScreen from './Screens/Login';
import SignUpScreen from './Screens/SignUp';
import ResetPasswordScreen from './Screens/ResetPassword';

const Stack = createStackNavigator();

const App = () => {
   return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
         <Stack.Screen name="Chat" component={ChatScreen} />
         <Stack.Screen name="Reset" component={ResetPasswordScreen}/>

      </Stack.Navigator>
    </NavigationContainer>

  )
  
}

export default App;