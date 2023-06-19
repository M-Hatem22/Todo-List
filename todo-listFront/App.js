import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Login from './screens/LoginScreen';
import TodoScreen from './screens/TodoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/RegisterScreen';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    
    
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Login></Login> */}
      {/* <TodoScreen></TodoScreen> */}
      <Stack.Screen
      name = "LoginScreen"
      component={Login}
      // options={{title: "Welcome"}}
      options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen name = "TodoScreen"
      component={TodoScreen}
      // options={{title:"Todo Screen"}}
      options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen name = "RegisterScreen"
      component={Register}
      // options={{title:"Todo Screen"}}
      options={{headerShown: false}}
      ></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
    
    );
  }
  
