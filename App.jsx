import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import StockMarketScreen from './screens/StockMarketScreen';
import StockDetailsScreen from './screens/StockDetailsScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6366f1',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Achievements" 
            component={AchievementsScreen}
            options={{ title: 'Achievements' }}
          />
          <Stack.Screen 
            name="StockMarket" 
            component={StockMarketScreen}
            options={({ navigation }) => ({ 
              title: 'Stock Market',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 10 }}
                >
                  <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={24} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen 
            name="StockDetails" 
            component={StockDetailsScreen}
            options={({ navigation }) => ({ 
              title: 'Stock Details',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 10 }}
                >
                  <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={24} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App; 