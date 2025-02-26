import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StockDetailsScreen = ({ route }) => {
  const { stock, isDarkMode, API_KEY } = route.params;
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStockDetails = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
      );
      const data = await response.json();
      setStockData(data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      Alert.alert('Error', 'Failed to fetch stock details');
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStockDetails();
  };

  if (loading) {
    return (
      <View style={[styles.container, isDarkMode && styles.darkMode]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#818cf8' : '#6366f1'} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.darkMode]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={isDarkMode ? '#818cf8' : '#6366f1'}
        />
      }
    >
      <View style={[styles.card, isDarkMode && styles.darkModeCard]}>
        <Text style={[styles.stockName, isDarkMode && styles.darkModeText]}>
          {stock.name} ({stock.symbol})
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.currentPrice, isDarkMode && styles.darkModeText]}>
            ${stockData?.c.toFixed(2)}
          </Text>
          <Text style={[
            styles.priceChange,
            { color: stockData?.dp >= 0 ? '#10b981' : '#ef4444' }
          ]}>
            {stockData?.dp >= 0 ? '+' : ''}{stockData?.dp.toFixed(2)}%
            <MaterialCommunityIcons
              name={stockData?.dp >= 0 ? 'trending-up' : 'trending-down'}
              size={24}
              color={stockData?.dp >= 0 ? '#10b981' : '#ef4444'}
            />
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>High</Text>
            <Text style={[styles.statValue, isDarkMode && styles.darkModeText]}>
              ${stockData?.h.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>Low</Text>
            <Text style={[styles.statValue, isDarkMode && styles.darkModeText]}>
              ${stockData?.l.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>Open</Text>
            <Text style={[styles.statValue, isDarkMode && styles.darkModeText]}>
              ${stockData?.o.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  darkMode: {
    backgroundColor: '#111827',
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkModeCard: {
    backgroundColor: '#1f2937',
  },
  darkModeText: {
    color: '#f3f4f6',
  },
  stockName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  currentPrice: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  priceChange: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default StockDetailsScreen; 