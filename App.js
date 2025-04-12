import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import UsersScreen from './screens/UsersScreen';
import UserDetailsScreen from './screens/UserDetailsScreen ';
import TrashBinsScreen from './screens/TrashBinsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UsersScreen" component={UsersScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Stack.Screen name="TrashBins" component={TrashBinsScreen} options={{ title: 'Liste des poubelles' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;