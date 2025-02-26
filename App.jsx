import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import StockMarketScreen from './screens/StockMarketScreen';
import AchievementsScreen from './screens/AchievementsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Achievements" 
            component={AchievementsScreen}
            options={{ 
              title: 'Achievements',
              headerStyle: {
                backgroundColor: '#6366f1',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="StockMarket" 
            component={StockMarketScreen}
            options={{ 
              title: 'Stock Market',
              headerStyle: {
                backgroundColor: '#6366f1',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App; 