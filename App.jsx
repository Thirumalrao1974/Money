import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import StockMarketScreen from './screens/StockMarketScreen';
import StockDetailsScreen from './screens/StockDetailsScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
              headerShown: true,
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{ marginLeft: 10 }}
                >
                  <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={24} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen 
            name="StockDetails" 
            component={StockDetailsScreen}
            options={{ 
              title: 'Stock Details',
              headerStyle: {
                backgroundColor: '#6366f1',
              },
              headerTintColor: '#fff',
              headerShown: true,
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{ marginLeft: 10 }}
                >
                  <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={24} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App; 