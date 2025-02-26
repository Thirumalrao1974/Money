import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StockMarketScreen = ({ route, navigation }) => {
  const { isDarkMode, onStockSelect } = route.params;
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'cuv906pr01qpi6ru1kfgcuv906pr01qpi6ru1kg0';

  // List of stock symbols to fetch
  const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA'];

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );
        const data = await response.json();
        return {
          symbol,
          name: getStockName(symbol), // Helper function to get stock names
          price: data.c,
          change: ((data.c - data.pc) / data.pc * 100).toFixed(2),
          high: data.h,
          low: data.l,
          invested: Math.random() < 0.5 // Random for demo purposes
        };
      });

      const stockData = await Promise.all(promises);
      setStocks(stockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      Alert.alert(
        'Error',
        'Failed to fetch stock data. Please try again later.',
        [{ text: 'OK' }]
      );
      setLoading(false);
    }
  };

  const getStockName = (symbol) => {
    const names = {
      AAPL: 'Apple Inc.',
      GOOGL: 'Alphabet Inc.',
      MSFT: 'Microsoft',
      AMZN: 'Amazon.com',
      TSLA: 'Tesla Inc.',
      META: 'Meta Platforms',
      NFLX: 'Netflix Inc.',
      NVDA: 'NVIDIA Corp.'
    };
    return names[symbol] || symbol;
  };

  const handleStockPress = (stock) => {
    if (onStockSelect) {
      onStockSelect(stock);
    } else {
      navigation.navigate('StockDetails', {
        stock,
        isDarkMode,
        API_KEY
      });
    }
  };

  const renderStockSection = (title, filtered) => (
    <View style={[styles.section, isDarkMode && styles.darkModeCard]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>
        {title}
      </Text>
      {filtered.map((stock) => (
        <TouchableOpacity
          key={stock.symbol}
          style={styles.stockItem}
          onPress={() => handleStockPress(stock)}
        >
          <View style={styles.stockInfo}>
            <Text style={[styles.stockSymbol, isDarkMode && styles.darkModeText]}>
              {stock.symbol}
            </Text>
            <Text style={[styles.stockName, isDarkMode && styles.darkModeText]}>
              {stock.name}
            </Text>
          </View>
          <View style={styles.stockPriceInfo}>
            <Text style={[styles.stockPrice, isDarkMode && styles.darkModeText]}>
              ${stock.price?.toFixed(2) || '-.--'}
            </Text>
            <Text style={[
              styles.stockChange,
              { color: parseFloat(stock.change) >= 0 ? '#10b981' : '#ef4444' }
            ]}>
              {stock.change >= 0 ? '+' : ''}{stock.change}%
              <MaterialCommunityIcons
                name={parseFloat(stock.change) >= 0 ? 'trending-up' : 'trending-down'}
                size={16}
                color={parseFloat(stock.change) >= 0 ? '#10b981' : '#ef4444'}
              />
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, isDarkMode && styles.darkMode]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#818cf8' : '#6366f1'} />
        <Text style={[styles.loadingText, isDarkMode && styles.darkModeText]}>
          Loading stock data...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, isDarkMode && styles.darkMode]}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={fetchStockData}
          tintColor={isDarkMode ? '#818cf8' : '#6366f1'}
        />
      }
    >
      {renderStockSection('Your Investments', stocks.filter(s => s.invested))}
      {renderStockSection('Available Stocks', stocks.filter(s => !s.invested))}
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
  darkModeCard: {
    backgroundColor: '#1f2937',
  },
  darkModeText: {
    color: '#f3f4f6',
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f2937',
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  stockName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  stockPriceInfo: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  stockChange: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1f2937',
  }
});

export default StockMarketScreen; 