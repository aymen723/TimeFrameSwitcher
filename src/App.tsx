import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './screens/CalendarScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// Import your screens
// You can add more screens as necessary
// import AnotherScreen from '../screens/AnotherScreen';
const queryClient = new QueryClient();
// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Calendar"
            screenOptions={{
              headerShown: false, // If you don't want to show the header bar
            }}>
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{title: 'Time Frame Switcher'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
