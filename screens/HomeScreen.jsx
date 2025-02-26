import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// At the very top of your file, before the HomeScreen component
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  balanceLabel: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionType: {
    color: '#6b7280',
  },
  rewardContainer: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  rewardAnimation: {
    width: 150,
    height: 150,
  },
  rewardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 10,
  },
  rewardDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  pointsText: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
    marginTop: 10,
  },
  onboardingContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  onboardingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyContainer: {
    width: '100%',
    marginBottom: 20,
  },
  currencyButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    marginBottom: 10,
  },
  selectedCurrency: {
    backgroundColor: '#6366f1',
  },
  currencyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedType: {
    opacity: 0.8,
  },
  typeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  overviewAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#10b981',
  },
  expenseText: {
    color: '#ef4444',
  },
  savingsText: {
    color: '#6366f1',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  modifiedText: {
    fontSize: 11,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  streakAnimationContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  streakLottie: {
    width: 150,
    height: 150,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: -20,
  },
  streakText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  currentStreakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  currentStreakText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#6b7280',
  },
  homeMascotImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 75,
  },
  currencyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
    marginBottom: 10,
  },
  currencyButtonsContainer: {
    width: '100%',
  },
  selectedCurrencyText: {
    color: 'white',
  },
  conversionResult: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  conversionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartContainer: {
    marginTop: 10,
  },
  chartRow: {
    marginBottom: 15,
  },
  chartLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 5,
  },
  barContainer: {
    height: 24,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  barText: {
    position: 'absolute',
    right: 8,
    top: 2,
    fontSize: 12,
    color: '#4b5563',
    fontWeight: 'bold',
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  dateButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  darkText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  darkModalContent: {
    backgroundColor: '#1f2937',
  },
  darkInput: {
    backgroundColor: '#4b5563',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginVertical: 15,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: '#6366f1',
  },
  darkSegment: {
    backgroundColor: '#374151',
  },
  segmentText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  activeSegmentText: {
    color: '#ffffff',
  },
  categoryList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#818cf8',
  },
  darkCategoryButton: {
    backgroundColor: '#374151',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedCategoryText: {
    color: 'white',
  },
  subCategoryList: {
    marginBottom: 20,
  },
  subCategoryButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 5,
  },
  selectedSubCategory: {
    backgroundColor: '#6366f1',
  },
  subCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedSubCategoryText: {
    color: 'white',
  },
  darkSubCategoryButton: {
    backgroundColor: '#4b5563',
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtons: {
    marginTop: 20,
    gap: 10,
  },
  categorySection: {
    marginVertical: 10,
    maxHeight: 200,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '47%',
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryCard: {
    backgroundColor: '#6366f1',
  },
  darkCategoryCard: {
    backgroundColor: '#374151',
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  subCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subCategoryCard: {
    width: '47%',
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedSubCategoryCard: {
    backgroundColor: '#818cf8',
  },
  addTransactionButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addTransactionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentTransactions: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '90%',
  },
  converterCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  converterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  converterBody: {
    gap: 15,
  },
  converterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  converterInput: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  currencySelectors: {
    gap: 15,
  },
  currencySelect: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  currencyScroll: {
    flexGrow: 0,
  },
  swapIcon: {
    alignSelf: 'center',
    padding: 10,
  },
  convertButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  lightCard: {
    backgroundColor: '#f3f4f6', // Light gray background
  },
  lightText: {
    color: '#4b5563', // Medium gray text
  },
  lightModalContent: {
    backgroundColor: '#ffffff',
  },
  lightInput: {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
  },
  lightCategoryCard: {
    backgroundColor: '#f3f4f6',
  },
  stockContainer: {
    gap: 15,
  },
  stockCard: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockPrice: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  stockChange: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  selectedType: {
    transform: [{ scale: 1.05 }],
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.05 }],
  },
  categoryCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  chartContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 200,
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
    width: 80,
  },
  percentageContainer: {
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barWrapper: {
    height: 150,
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  visualizationContainer: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  visualizationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 250,
    alignItems: 'flex-end',
  },
  barGroup: {
    alignItems: 'center',
    width: '28%',
  },
  barBackground: {
    height: 180,
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  barValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  visualizationCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  visualizationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 250,
    paddingTop: 20,
  },
  barColumn: {
    alignItems: 'center',
    width: '28%',
  },
  barWrapper: {
    height: 160,
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  barAmount: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  distributionCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  distributionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  horizontalBars: {
    flexDirection: 'row',
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barSlice: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliceLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  onboardingStep: {
    width: '100%',
    alignItems: 'center',
  },
  onboardingSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  genderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    marginBottom: 10,
    width: '100%',
  },
  selectedGender: {
    backgroundColor: '#6366f1',
  },
  genderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
  },
  selectedGenderText: {
    color: '#ffffff',
  },
  transactionRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  transactionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // Light purple background
  },
  distributionBar: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 15,
    backgroundColor: '#f3f4f6',
  },
  distributionSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  distributionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  distributionLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  labelText: {
    fontSize: 14,
    color: '#4b5563',
  },
  achievementContainer: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  achievementAnimation: {
    width: 150,
    height: 150,
  },
  achievementTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 10,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 10,
    borderRadius: 15,
  },
  pointsText: {
    fontSize: 18,
    color: '#f59e0b',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

const HomeScreen = () => {
  // Move isDarkMode to the very top of states
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();
  
  // Initialize all financial values to 0
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [convertAmount, setConvertAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [mascotAnimation] = useState(new Animated.Value(0));
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [badges, setBadges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [rank, setRank] = useState(null);
  const [showStockMarket, setShowStockMarket] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  
  // Currency symbols mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    JPY: '¥',
    INR: '₹',
    GBP: '£',
    AUD: 'A$'
  };

  // Transaction categories
  const transactionCategories = {
    expense: {
      'Bills & Utilities': ['Electricity', 'Water', 'Internet', 'Phone', 'Gas'],
      'Housing': ['Rent', 'Mortgage', 'Maintenance', 'Property Tax'],
      'Education': ['School Fee', 'College Fee', 'Books', 'Tuition', 'Courses'],
      'Healthcare': ['Medicine', 'Doctor Visit', 'Hospital', 'Insurance'],
      'Food': ['Groceries', 'Dining Out', 'Food Delivery', 'Snacks'],
      'Transportation': ['Fuel', 'Public Transport', 'Car Maintenance', 'Parking'],
      'Personal': ['Clothing', 'Grooming', 'Gym', 'Entertainment'],
      'Others': ['Gifts', 'Donations', 'Miscellaneous']
    },
    income: {
      'Salary': ['Regular Job', 'Part-time', 'Bonus', 'Overtime'],
      'Business': ['Profit', 'Sales', 'Commission'],
      'Investments': ['Stocks', 'Mutual Funds', 'Dividends', 'Real Estate'],
      'Other Income': ['Freelance', 'Rental', 'Interest', 'Gifts']
    },
    savings: {
      'Financial': ['Fixed Deposit', 'Recurring Deposit', 'Emergency Fund'],
      'Investments': ['Gold', 'Stock Market', 'Mutual Funds', 'Bonds'],
      'Property': ['Real Estate', 'Land'],
      'Retirement': ['Pension Fund', '401k', 'IRA']
    }
  };

  // Currency converter states
  const [showCurrencyConverter, setShowCurrencyConverter] = useState(false);

  // Exchange rates
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    JPY: 151.37,
    INR: 83.12,
    GBP: 0.79,
    AUD: 1.52
  };

  // Calculate budget status
  const remainingBudget = income - expenses;
  const budgetStatus = remainingBudget > 0 ? 'good' : 'bad';
  
  // Mascot animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(mascotAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Format amount with currency symbol
  const formatAmount = (amount) => {
    return `${currencySymbols[selectedCurrency]}${amount}`;
  };

  // Currency conversion helper
  const convertCurrency = (amount, from, to) => {
    const usdAmount = amount / exchangeRates[from];
    return usdAmount * exchangeRates[to];
  };

  // Add this function after the convertCurrency function
  const handleCurrencyConversion = () => {
    if (!convertAmount) return;
    
    const amount = parseFloat(convertAmount);
    const converted = convertCurrency(amount, fromCurrency, toCurrency);
    
    return {
      from: `${currencySymbols[fromCurrency]}${amount.toFixed(2)}`,
      to: `${currencySymbols[toCurrency]}${converted.toFixed(2)}`
    };
  };

  // Add this function to format the date and time
  const formatDateTime = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    })}`;
  };

  // Define achievement categories
  const ACHIEVEMENTS = {
    FIRST_TIME: [
      {
        id: 'first_transaction',
        title: 'First Step!',
        description: 'Made your first transaction',
        points: 100,
        icon: '🎉',
        animation: 'https://lottie.host/2c692d4b-c0b1-4ee4-b696-486eee4e7a50/JGfQKthvE1.json'
      },
      {
        id: 'first_savings',
        title: 'Savings Pioneer',
        description: 'Started your savings journey',
        points: 150,
        icon: '🏦',
        animation: 'https://lottie.host/7f726503-4f6c-4a51-9af0-c44f24a0b6b9/7Zn6UGsWE4.json'
      }
    ],
    MILESTONES: [
      {
        id: 'transactions_10',
        title: 'Transaction Master',
        description: 'Completed 10 transactions',
        points: 200,
        icon: '🎯',
        animation: 'https://lottie.host/b5c42947-9c6f-44c7-b89c-91544e6eb281/UHc9rjPLkA.json'
      }
    ],
    STREAKS: [
      {
        id: 'streak_7',
        title: 'Week Warrior',
        description: '7-day tracking streak',
        points: 300,
        icon: '🔥',
        animation: 'https://lottie.host/c3d1f01b-3f69-4721-ae76-8eab32fb5c6c/2eQYxFsHOx.json'
      }
    ]
  };

  // Add this function to check and award achievements
  const checkAchievements = async (transaction) => {
    // Check first transaction
    if (transactions.length === 1) {
      awardAchievement(ACHIEVEMENTS.FIRST_TIME[0]);
    }

    // Check transaction milestones
    if (transactions.length === 10) {
      awardAchievement(ACHIEVEMENTS.MILESTONES[0]);
    }

    // Check savings achievements
    if (transaction.type === 'savings' && !achievements.find(a => a.id === 'first_savings')) {
      awardAchievement(ACHIEVEMENTS.FIRST_TIME[1]);
    }

    // Check streak achievements
    if (streak === 7 && !achievements.find(a => a.id === 'streak_7')) {
      awardAchievement(ACHIEVEMENTS.STREAKS[0]);
    }

    // Update points and rank
    updateRank();
  };

  // Function to award achievements
  const awardAchievement = async (achievement) => {
    try {
      // Show achievement animation
      setCurrentAchievement(achievement);
      setShowAchievement(true);

      // Update local state first
      setAchievements(prevAchievements => {
        // Check if achievement already exists
        if (!prevAchievements.some(a => a.id === achievement.id)) {
          return [...prevAchievements, achievement];
        }
        return prevAchievements;
      });
      
      // Update points
      setPoints(prev => prev + achievement.points);
      
      // Save to AsyncStorage
      const existingAchievements = await AsyncStorage.getItem('achievements');
      let updatedAchievements = [];
      
      if (existingAchievements) {
        updatedAchievements = JSON.parse(existingAchievements);
        // Only add if not already present
        if (!updatedAchievements.some(a => a.id === achievement.id)) {
          updatedAchievements.push(achievement);
        }
      } else {
        updatedAchievements = [achievement];
      }

      await AsyncStorage.multiSet([
        ['achievements', JSON.stringify(updatedAchievements)],
        ['points', String(points + achievement.points)]
      ]);

      // Hide achievement after duration
      setTimeout(() => {
        setShowAchievement(false);
      }, 16000);
    } catch (error) {
      console.error('Error awarding achievement:', error);
    }
  };

  // Add this component for achievement animation
  const AchievementDisplay = ({ achievement }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          baseStyles.achievementContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <LottieView
          source={achievement.animation}
          autoPlay
          loop={false}
          style={baseStyles.achievementAnimation}
        />
        <Text style={baseStyles.achievementTitle}>{achievement.title}</Text>
        <Text style={baseStyles.achievementDescription}>{achievement.description}</Text>
        <View style={baseStyles.pointsContainer}>
          <MaterialCommunityIcons name="star" size={24} color="#f59e0b" />
          <Text style={baseStyles.pointsText}>+{achievement.points} Points</Text>
        </View>
      </Animated.View>
    );
  };

  // Add this useEffect to load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Function to load initial data
  const loadInitialData = async () => {
    try {
      const [
        savedTransactions,
        savedIncome,
        savedExpenses,
        savedSavings
      ] = await Promise.all([
        AsyncStorage.getItem('transactions'),
        AsyncStorage.getItem('income'),
        AsyncStorage.getItem('expenses'),
        AsyncStorage.getItem('savings')
      ]);

      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
      setIncome(savedIncome ? parseFloat(savedIncome) : 0);
      setExpenses(savedExpenses ? parseFloat(savedExpenses) : 0);
      setSavings(savedSavings ? parseFloat(savedSavings) : 0);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Add this function to update rank based on points
  const updateRank = () => {
    try {
      // Define rank thresholds
      const ranks = {
        'Beginner': 0,
        'Saver': 500,
        'Money Master': 1000,
        'Finance Guru': 2000,
        'Wealth Expert': 5000
      };

      // Find current rank based on points
      let currentRank = 'Beginner';
      for (const [rankName, threshold] of Object.entries(ranks)) {
        if (points >= threshold) {
          currentRank = rankName;
        } else {
          break;
        }
      }

      // Update rank if changed
      if (currentRank !== rank) {
        setRank(currentRank);
        AsyncStorage.setItem('rank', currentRank);

        // Show rank up animation if rank improved
        if (ranks[currentRank] > ranks[rank]) {
          setCurrentReward({
            title: 'Rank Up!',
            description: `You've reached ${currentRank} rank!`,
            points: 0,
            icon: '🏆',
            animation: 'https://lottie.host/rank-up-animation.json'
          });
          setShowReward(true);
        }
      }
    } catch (error) {
      console.error('Error updating rank:', error);
    }
  };

  // Update the handleAddTransaction function
  const handleAddTransaction = async () => {
    try {
      if (!transactionAmount || !selectedMainCategory) {
        Alert.alert('Error', 'Please enter amount and select a category');
        return;
      }

      const amount = parseFloat(transactionAmount);
      if (isNaN(amount) || amount <= 0) {
        Alert.alert('Error', 'Please enter a valid amount');
        return;
      }

      // Create new transaction object
      const newTransaction = {
        id: Date.now().toString(),
        amount: amount,
        type: transactionType,
        mainCategory: selectedMainCategory,
        subCategory: selectedSubCategory || '',
        date: new Date(),
        currency: selectedCurrency
      };

      // Update transactions state
      const updatedTransactions = [newTransaction, ...transactions];
      setTransactions(updatedTransactions);

      // Update totals based on transaction type
      if (transactionType === 'income') {
        setIncome(prev => prev + amount);
      } else if (transactionType === 'expense') {
        setExpenses(prev => prev + amount);
      } else if (transactionType === 'savings') {
        setSavings(prev => prev + amount);
      }

      // Save transaction data
      await AsyncStorage.multiSet([
        ['transactions', JSON.stringify(updatedTransactions)],
        ['income', String(transactionType === 'income' ? income + amount : income)],
        ['expenses', String(transactionType === 'expense' ? expenses + amount : expenses)],
        ['savings', String(transactionType === 'savings' ? savings + amount : savings)]
      ]);

      // Check for achievements
      if (updatedTransactions.length === 1) {
        // First transaction achievement
        await awardAchievement(ACHIEVEMENTS.FIRST_TIME[0]);
      }

      if (updatedTransactions.length === 10) {
        // 10 transactions achievement
        await awardAchievement(ACHIEVEMENTS.MILESTONES[0]);
      }

      if (transactionType === 'savings' && !achievements.some(a => a.id === 'first_savings')) {
        // First savings achievement
        await awardAchievement(ACHIEVEMENTS.FIRST_TIME[1]);
      }

      // Reset form and close modal
      setTransactionAmount('');
      setSelectedMainCategory('');
      setSelectedSubCategory('');
      setShowAddTransaction(false);
      setTransactionType('expense');

      // Show success message
      Alert.alert('Success', 'Transaction added successfully!');

    } catch (error) {
      console.error('Error adding transaction:', error);
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  // Add this function to calculate totals
  const calculateTotals = () => {
    const total = transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const totalSavings = totalIncome - totalExpenses;
    
    return { total, totalIncome, totalExpenses, totalSavings };
  };

  // Update the transactions display section
  const renderTransactions = () => (
    <View style={baseStyles.recentTransactions}>
      <Text style={[baseStyles.sectionTitle, isDarkMode && baseStyles.darkText]}>
        Recent Transactions
      </Text>
      {transactions.length === 0 ? (
        <Text style={[baseStyles.emptyText, isDarkMode && baseStyles.darkText]}>
          No transactions yet
        </Text>
      ) : (
        transactions.map((transaction) => (
          <View 
            key={transaction.id} 
            style={[baseStyles.transactionItem, isDarkMode && baseStyles.darkCard]}
          >
            {/* Transaction Details */}
            <View>
              <Text style={[baseStyles.transactionCategory, isDarkMode && baseStyles.darkText]}>
                {transaction.mainCategory}
                {transaction.subCategory ? ` - ${transaction.subCategory}` : ''}
              </Text>
              <Text style={baseStyles.transactionDate}>
                {formatDateTime(new Date(transaction.date))}
              </Text>
            </View>

            {/* Amount and Actions */}
            <View style={baseStyles.transactionRightSection}>
              <Text style={[
                baseStyles.transactionAmount,
                transaction.type === 'income' ? baseStyles.incomeText :
                transaction.type === 'expense' ? baseStyles.expenseText :
                baseStyles.savingsText
              ]}>
                {`${currencySymbols[transaction.currency]}${transaction.amount}`}
              </Text>

              <View style={baseStyles.transactionActions}>
                <TouchableOpacity 
                  onPress={() => handleEditTransaction(transaction)}
                  style={baseStyles.actionButton}
                >
                  <MaterialCommunityIcons 
                    name="pencil" 
                    size={20} 
                    color={isDarkMode ? '#818cf8' : '#6366f1'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDeleteTransaction(transaction.id)}
                  style={baseStyles.actionButton}
                >
                  <MaterialCommunityIcons 
                    name="delete" 
                    size={20} 
                    color="#ef4444" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );

  // Check and update streak
  const checkStreak = () => {
    if (remainingBudget > 0) {
      setStreak(prev => prev + 1);
      if (streak + 1 >= 7) {
        addBadge('Week Warrior', '🏆');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      setStreak(0);
    }
  };

  // Add badge
  const addBadge = (title, emoji) => {
    if (!badges.some(b => b.title === title)) {
      setBadges([...badges, { title, emoji }]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const mascotStyle = {
    transform: [
      {
        translateY: mascotAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  // Add this function to check and update daily streak
  const checkDailyStreak = () => {
    const today = new Date();
    const lastLogin = lastLoginDate ? new Date(lastLoginDate) : null;
    
    if (!lastLogin) {
      // First time login
      setStreak(1);
      setShowStreakAnimation(true);
    } else {
      const diffTime = Math.abs(today - lastLogin);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day login
        setStreak(prev => prev + 1);
        setShowStreakAnimation(true);
      } else if (diffDays > 1) {
        // Streak broken
        setStreak(1);
      }
    }
    
    setLastLoginDate(today.toISOString());
  };

  // Add this useEffect to check streak on app open
  useEffect(() => {
    checkDailyStreak();
  }, []);

  // Add this near your other state variables
  const [streakAnimationUrl] = useState('https://lottie.host/c3d1f01b-3f69-4721-ae76-8eab32fb5c6c/2eQYxFsHOx.json');

  // Update the StreakAnimation component
  const StreakAnimation = () => (
    <Animatable.View 
      style={baseStyles.streakAnimationContainer}
      animation="bounceIn"
      duration={1000}
      onAnimationEnd={() => setTimeout(() => setShowStreakAnimation(false), 3000)}
    >
      <LottieView
        source={{ uri: streakAnimationUrl }}
        autoPlay
        loop={false}
        style={baseStyles.streakLottie}
      />
      <Animatable.Text 
        animation="pulse" 
        iterationCount="infinite" 
        style={baseStyles.streakNumber}
      >
        {streak}
      </Animatable.Text>
      <Animatable.Text 
        animation="fadeIn"
        delay={500}
        style={baseStyles.streakText}
      >
        Day Streak! 🔥
      </Animatable.Text>
    </Animatable.View>
  );

  // Get the styles at the start of your component
  const getStyles = () => ({
    ...baseStyles,
    darkCard: {
      backgroundColor: isDarkMode ? '#374151' : '#ffffff',
    },
    darkText: {
      color: isDarkMode ? '#e5e7eb' : '#1f2937',
    },
    barSlice: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      borderRadius: 10,
    },
    horizontalBars: {
      flexDirection: 'row',
      height: 80,
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 10,
    },
    visualizationCard: {
      margin: 15,
      padding: 20,
      borderRadius: 15,
      backgroundColor: isDarkMode ? '#374151' : '#ffffff',
    },
    sliceText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sliceLabel: {
      color: '#ffffff',
      fontSize: 12,
      marginTop: 4,
    }
  });

  const styles = getStyles();

  // Update the totals calculation to handle zero values
  const { totals, total } = useMemo(() => {
    const totals = {
      income: 0,    // Start with 0
      expenses: 0,  // Start with 0
      savings: 0    // Start with 0
    };
    
    if (transactions.length > 0) {
      totals.income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      totals.expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      totals.savings = transactions
        .filter(t => t.type === 'savings')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    }
    
    const total = Math.max(totals.income + totals.expenses + totals.savings, 1); // Avoid division by zero
    return { totals, total };
  }, [transactions]);

  // Add this component for the visualization
  const TransactionVisualization = () => (
    <View style={[
      styles.visualizationCard,
      isDarkMode ? styles.darkCard : styles.lightCard
    ]}>
      <Text style={[
        styles.visualizationTitle,
        isDarkMode ? { color: '#e5e7eb' } : styles.lightText
      ]}>Financial Distribution</Text>

      {/* Horizontal Distribution Bar */}
      <View style={styles.distributionBar}>
        {/* Income Section */}
        <View style={[
          styles.distributionSection,
          {
            flex: 1,
            backgroundColor: '#00e676', // Much brighter green
            minWidth: '33%',
            opacity: income > 0 ? 1 : 0.5
          }
        ]}>
          <Text style={[
            styles.distributionText, 
            { 
              fontWeight: 'bold',
              color: '#ffffff',  // Pure white
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }
          ]}>
            {income > 0 
              ? `${Math.round((income / (income + expenses + savings || 1)) * 100)}%` 
              : '0%'
            }
          </Text>
        </View>

        {/* Expenses Section */}
        <View style={[
          styles.distributionSection,
          {
            flex: 1,
            backgroundColor: '#ff1744', // Bright red
            minWidth: '33%',
            opacity: expenses > 0 ? 1 : 0.5
          }
        ]}>
          <Text style={[
            styles.distributionText, 
            { 
              fontWeight: 'bold',
              color: '#ffffff',  // Pure white
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }
          ]}>
            {expenses > 0 
              ? `${Math.round((expenses / (income + expenses + savings || 1)) * 100)}%` 
              : '0%'
            }
          </Text>
        </View>

        {/* Savings Section */}
        <View style={[
          styles.distributionSection,
          {
            flex: 1,
            backgroundColor: '#2962ff', // Brighter blue
            minWidth: '33%',
            opacity: savings > 0 ? 1 : 0.5
          }
        ]}>
          <Text style={[
            styles.distributionText, 
            { 
              fontWeight: 'bold',
              color: '#ffffff',  // Pure white
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }
          ]}>
            {savings > 0 
              ? `${Math.round((savings / (income + expenses + savings || 1)) * 100)}%` 
              : '0%'
            }
          </Text>
        </View>
      </View>

      {/* Labels with updated colors */}
      <View style={styles.distributionLabels}>
        <View style={styles.labelItem}>
          <View style={[styles.labelDot, { backgroundColor: '#00e676' }]} />
          <Text style={[
            styles.labelText, 
            isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
          ]}>Income</Text>
        </View>
        <View style={styles.labelItem}>
          <View style={[styles.labelDot, { backgroundColor: '#ff1744' }]} />
          <Text style={[
            styles.labelText, 
            isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
          ]}>Expenses</Text>
        </View>
        <View style={styles.labelItem}>
          <View style={[styles.labelDot, { backgroundColor: '#2962ff' }]} />
          <Text style={[
            styles.labelText, 
            isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
          ]}>Savings</Text>
        </View>
      </View>
    </View>
  );

  // Update the renderOnboarding function
  const renderOnboarding = () => {
    return (
      <View style={styles.onboardingContainer}>
        {/* Step 1: Name */}
        {currentStep === 0 && (
          <Animatable.View animation="fadeIn" style={styles.onboardingStep}>
            <Text style={styles.onboardingTitle}>Welcome to KuberaX!</Text>
            <Text style={styles.onboardingSubtitle}>What's your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={[styles.button, !name && styles.buttonDisabled]}
              disabled={!name}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        {/* Step 2: Age */}
        {currentStep === 1 && (
          <Animatable.View animation="fadeIn" style={styles.onboardingStep}>
            <Text style={styles.onboardingTitle}>Hi, {name}!</Text>
            <Text style={styles.onboardingSubtitle}>What's your age?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              maxLength={2}
            />
            <TouchableOpacity
              style={[styles.button, !age && styles.buttonDisabled]}
              disabled={!age}
              onPress={() => setCurrentStep(2)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        {/* Step 3: Gender */}
        {currentStep === 2 && (
          <Animatable.View animation="fadeIn" style={styles.onboardingStep}>
            <Text style={styles.onboardingTitle}>Select your gender</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map((genderOption) => (
                <TouchableOpacity
                  key={genderOption}
                  style={[
                    styles.genderButton,
                    gender === genderOption && styles.selectedGender
                  ]}
                  onPress={() => setGender(genderOption)}
                >
                  <Text style={[
                    styles.genderText,
                    gender === genderOption && styles.selectedGenderText
                  ]}>
                    {genderOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.button, !gender && styles.buttonDisabled]}
              disabled={!gender}
              onPress={() => setCurrentStep(3)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        {/* Step 4: Currency */}
        {currentStep === 3 && (
          <Animatable.View animation="fadeIn" style={styles.onboardingStep}>
            <Text style={styles.onboardingTitle}>Select your currency</Text>
            <View style={styles.currencyContainer}>
              {Object.keys(currencySymbols).map((currency) => (
                <TouchableOpacity
                  key={currency}
                  style={[
                    styles.currencyButton,
                    selectedCurrency === currency && styles.selectedCurrency
                  ]}
                  onPress={() => setSelectedCurrency(currency)}
                >
                  <Text style={[
                    styles.currencyText,
                    selectedCurrency === currency && styles.selectedCurrencyText
                  ]}>
                    {currencySymbols[currency]} {currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.button, !selectedCurrency && styles.buttonDisabled]}
              disabled={!selectedCurrency}
              onPress={async () => {
                // Reset all previous data first
                await resetAllData();
                
                // Then save new user data
                await AsyncStorage.multiSet([
                  ['name', name],
                  ['age', age],
                  ['gender', gender],
                  ['currency', selectedCurrency],
                  ['onboardingComplete', 'true']
                ]);
                setCurrentStep(4);
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    );
  };

  // Add this function before the return statement
  const renderCurrencyConverterModal = () => (
    <Modal
      visible={showCurrencyConverter}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCurrencyConverter(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          isDarkMode ? styles.darkModalContent : styles.lightModalContent
        ]}>
          <View style={styles.modalHeader}>
            <Text style={[
              styles.modalTitle,
              isDarkMode ? { color: '#e5e7eb' } : styles.lightText
            ]}>Currency Converter</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCurrencyConverter(false)}
            >
              <Text style={[
                styles.closeButtonText, 
                isDarkMode ? { color: '#e5e7eb' } : styles.lightText
              ]}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.converterInput,
              isDarkMode ? styles.darkInput : styles.lightInput
            ]}
            placeholder="Enter amount"
            placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
            value={convertAmount}
            onChangeText={setConvertAmount}
            keyboardType="numeric"
          />

          <View style={styles.currencySelectors}>
            <View style={styles.currencySelect}>
              <Text style={[
                styles.label,
                isDarkMode ? { color: '#e5e7eb' } : styles.lightText
              ]}>From</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(currencySymbols).map((currency) => (
                  <TouchableOpacity
                    key={currency}
                    style={[
                      styles.currencyButton,
                      fromCurrency === currency && {
                        backgroundColor: isDarkMode ? '#818cf8' : '#6366f1'
                      },
                      isDarkMode ? {
                        backgroundColor: '#4b5563'
                      } : styles.lightCurrencyButton
                    ]}
                    onPress={() => setFromCurrency(currency)}
                  >
                    <Text style={[
                      styles.currencyButtonText,
                      fromCurrency === currency && { color: '#ffffff' },
                      isDarkMode ? { color: '#e5e7eb' } : { color: '#4b5563' }
                    ]}>
                      {currencySymbols[currency]} {currency}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <MaterialCommunityIcons 
              name="swap-vertical" 
              size={24} 
              color={isDarkMode ? '#818cf8' : '#6366f1'}
              style={styles.swapIcon}
              onPress={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
            />

            <View style={styles.currencySelect}>
              <Text style={[
                styles.label,
                isDarkMode ? { color: '#e5e7eb' } : styles.lightText
              ]}>To</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(currencySymbols).map((currency) => (
                  <TouchableOpacity
                    key={currency}
                    style={[
                      styles.currencyButton,
                      toCurrency === currency && {
                        backgroundColor: isDarkMode ? '#818cf8' : '#6366f1'
                      },
                      isDarkMode ? {
                        backgroundColor: '#4b5563'
                      } : styles.lightCurrencyButton
                    ]}
                    onPress={() => setToCurrency(currency)}
                  >
                    <Text style={[
                      styles.currencyButtonText,
                      toCurrency === currency && { color: '#ffffff' },
                      isDarkMode ? { color: '#e5e7eb' } : { color: '#4b5563' }
                    ]}>
                      {currencySymbols[currency]} {currency}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.convertButton, !convertAmount && styles.disabledButton]}
            onPress={() => {
              if (!convertAmount) return;
              const amount = parseFloat(convertAmount);
              if (isNaN(amount)) return;
              
              const converted = convertCurrency(amount, fromCurrency, toCurrency);
              setResult({
                from: `${currencySymbols[fromCurrency]}${amount.toFixed(2)}`,
                to: `${currencySymbols[toCurrency]}${converted.toFixed(2)}`
              });
            }}
            disabled={!convertAmount}
          >
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>

          {result && (
            <Animatable.View 
              animation="fadeIn" 
              style={[
                styles.resultContainer,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                  borderWidth: 2,
                  borderColor: isDarkMode ? '#818cf8' : '#6366f1',
                  padding: 20,
                  borderRadius: 15,
                  marginTop: 20
                }
              ]}
            >
              <Text style={[
                styles.resultText,
                {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: isDarkMode ? '#10b981' : '#047857'
                }
              ]}>
                {result.from} = {result.to}
              </Text>
            </Animatable.View>
          )}
        </View>
      </View>
    </Modal>
  );

  // Add this function to reset all values
  const resetFinancialData = () => {
    setIncome(0);
    setExpenses(0);
    setSavings(0);
    setTransactions([]);
    // Save reset values to AsyncStorage
    AsyncStorage.multiSet([
      ['income', '0'],
      ['expenses', '0'],
      ['savings', '0'],
      ['transactions', JSON.stringify([])],
      ['isExistingUser', 'true']
    ]);
  };

  // Add this to your useEffect for new users
  useEffect(() => {
    const initializeNewUser = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
        
        if (!onboardingComplete) {
          // Reset everything for new user
          await resetAllData();
        }
      } catch (error) {
        console.error('Error initializing new user:', error);
      }
    };

    initializeNewUser();
  }, []);

  // Add this function to handle edit and delete
  const handleEditTransaction = (transaction) => {
    // Set the transaction details in the form
    setTransactionAmount(transaction.amount.toString());
    setTransactionType(transaction.type);
    setSelectedMainCategory(transaction.mainCategory);
    setSelectedSubCategory(transaction.subCategory);
    
    // Show the modal in edit mode
    setEditingTransactionId(transaction.id);
    setShowAddTransaction(true);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      // Show confirmation dialog
      Alert.alert(
        "Delete Transaction",
        "Are you sure you want to delete this transaction?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive",
            onPress: async () => {
              // Filter out the transaction
              const updatedTransactions = transactions.filter(t => t.id !== transactionId);
              setTransactions(updatedTransactions);
              
              // Recalculate totals
              const deletedTransaction = transactions.find(t => t.id === transactionId);
              if (deletedTransaction.type === 'income') {
                setIncome(prev => prev - deletedTransaction.amount);
              } else if (deletedTransaction.type === 'expense') {
                setExpenses(prev => prev - deletedTransaction.amount);
              } else if (deletedTransaction.type === 'savings') {
                setSavings(prev => prev - deletedTransaction.amount);
              }

              // Save to AsyncStorage
              await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
              
              // Show success message
              Alert.alert("Success", "Transaction deleted successfully!");
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  // Add this function to completely reset all data
  const resetAllData = async () => {
    try {
      // Reset all states to initial values
      setIncome(0);
      setExpenses(0);
      setSavings(0);
      setTransactions([]);
      setStreak(0);
      setPoints(0);
      setBadges([]);
      setAchievements([]);
      
      // Clear all data from AsyncStorage
      await AsyncStorage.multiRemove([
        'transactions',
        'income',
        'expenses',
        'savings',
        'streak',
        'points',
        'badges',
        'achievements',
        'lastLoginDate',
        'isExistingUser'
      ]);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  // Add this useEffect to load achievements on component mount
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const savedAchievements = await AsyncStorage.getItem('achievements');
        const savedPoints = await AsyncStorage.getItem('points');
        
        if (savedAchievements) {
          setAchievements(JSON.parse(savedAchievements));
        }
        if (savedPoints) {
          setPoints(parseInt(savedPoints));
        }
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    };

    loadAchievements();
  }, []);

  // Add this useEffect to persist dark mode setting
  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem('darkMode');
        setIsDarkMode(savedMode === 'true');
      } catch (error) {
        console.error('Error loading dark mode setting:', error);
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem('darkMode', String(newMode));
    } catch (error) {
      console.error('Error saving dark mode setting:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={isDarkMode ? ['#1f2937', '#111827'] : ['#ffffff', '#f3f4f6']}
        style={styles.gradient}
      >
        {currentStep < 4 ? (
          renderOnboarding()
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={[styles.welcomeText, styles.darkText]}>
                  Welcome, {name}
                </Text>
                <View style={styles.headerButtons}>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('Achievements', { 
                      achievements, 
                      points 
                    })}
                  >
                    <MaterialCommunityIcons 
                      name="trophy" 
                      size={24} 
                      color={isDarkMode ? '#818cf8' : '#6366f1'} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => setShowCurrencyConverter(true)}
                  >
                    <MaterialCommunityIcons 
                      name="cash-multiple"
                      size={24} 
                      color={isDarkMode ? '#818cf8' : '#6366f1'} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('StockMarket', { isDarkMode })}
                  >
                    <MaterialCommunityIcons 
                      name="chart-line" 
                      size={24} 
                      color={isDarkMode ? '#818cf8' : '#6366f1'} 
                    />
                  </TouchableOpacity>
                  <Switch 
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#767577', true: '#818cf8' }}
                    thumbColor={isDarkMode ? '#6366f1' : '#f4f3f4'}
                  />
                </View>
              </View>
            </View>

            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
              {/* Income Card */}
              <View style={[styles.summaryCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <Text style={[styles.cardLabel, isDarkMode ? styles.darkText : styles.lightText]}>
                  Income
                </Text>
                <Text style={[styles.cardAmount, styles.incomeText]}>
                  {formatAmount(income)}
                </Text>
              </View>

              {/* Expenses Card */}
              <View style={[styles.summaryCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <Text style={[styles.cardLabel, isDarkMode ? styles.darkText : styles.lightText]}>
                  Expenses
                </Text>
                <Text style={[styles.cardAmount, styles.expenseText]}>
                  {formatAmount(expenses)}
                </Text>
              </View>

              {/* Savings Card - Fix the calculation */}
              <View style={[styles.summaryCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <Text style={[styles.cardLabel, isDarkMode ? styles.darkText : styles.lightText]}>
                  Savings
                </Text>
                <Text style={[styles.cardAmount, styles.savingsText]}>
                  {formatAmount(savings)} {/* Use savings directly instead of calculating */}
                </Text>
              </View>
            </View>

            {/* Financial Visualization */}
            {transactions.length > 0 && (
              <View style={[
                styles.visualizationCard,
                isDarkMode ? styles.darkCard : styles.lightCard
              ]}>
                <Text style={[
                  styles.visualizationTitle,
                  isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                ]}>Financial Distribution</Text>

                {/* Horizontal Distribution Bar */}
                <View style={styles.distributionBar}>
                  {/* Income Section */}
                  <View style={[
                    styles.distributionSection,
                    {
                      flex: 1,
                      backgroundColor: '#00e676', // Much brighter green
                      minWidth: '33%',
                      opacity: income > 0 ? 1 : 0.5
                    }
                  ]}>
                    <Text style={[
                      styles.distributionText, 
                      { 
                        fontWeight: 'bold',
                        color: '#ffffff',  // Pure white
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                      }
                    ]}>
                      {income > 0 
                        ? `${Math.round((income / (income + expenses + savings || 1)) * 100)}%` 
                        : '0%'
                      }
                    </Text>
                  </View>

                  {/* Expenses Section */}
                  <View style={[
                    styles.distributionSection,
                    {
                      flex: 1,
                      backgroundColor: '#ff1744', // Bright red
                      minWidth: '33%',
                      opacity: expenses > 0 ? 1 : 0.5
                    }
                  ]}>
                    <Text style={[
                      styles.distributionText, 
                      { 
                        fontWeight: 'bold',
                        color: '#ffffff',  // Pure white
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                      }
                    ]}>
                      {expenses > 0 
                        ? `${Math.round((expenses / (income + expenses + savings || 1)) * 100)}%` 
                        : '0%'
                      }
                    </Text>
                  </View>

                  {/* Savings Section */}
                  <View style={[
                    styles.distributionSection,
                    {
                      flex: 1,
                      backgroundColor: '#2962ff', // Brighter blue
                      minWidth: '33%',
                      opacity: savings > 0 ? 1 : 0.5
                    }
                  ]}>
                    <Text style={[
                      styles.distributionText, 
                      { 
                        fontWeight: 'bold',
                        color: '#ffffff',  // Pure white
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                      }
                    ]}>
                      {savings > 0 
                        ? `${Math.round((savings / (income + expenses + savings || 1)) * 100)}%` 
                        : '0%'
                      }
                    </Text>
                  </View>
                </View>

                {/* Labels with updated colors */}
                <View style={styles.distributionLabels}>
                  <View style={styles.labelItem}>
                    <View style={[styles.labelDot, { backgroundColor: '#00e676' }]} />
                    <Text style={[
                      styles.labelText, 
                      isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
                    ]}>Income</Text>
                  </View>
                  <View style={styles.labelItem}>
                    <View style={[styles.labelDot, { backgroundColor: '#ff1744' }]} />
                    <Text style={[
                      styles.labelText, 
                      isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
                    ]}>Expenses</Text>
                  </View>
                  <View style={styles.labelItem}>
                    <View style={[styles.labelDot, { backgroundColor: '#2962ff' }]} />
                    <Text style={[
                      styles.labelText, 
                      isDarkMode ? { color: '#e5e7eb' } : { color: '#111827', fontWeight: '600' }
                    ]}>Savings</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Add Transaction Button */}
            <TouchableOpacity
              style={styles.addTransactionButton}
              onPress={() => setShowAddTransaction(true)}
            >
              <Text style={styles.addTransactionText}>Add Transaction</Text>
            </TouchableOpacity>

            {/* Recent Transactions */}
            {renderTransactions()}

            {/* Add Stock Market Modal */}
            <Modal
              visible={showStockMarket}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setShowStockMarket(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={[
                  styles.modalContent,
                  isDarkMode ? styles.darkModalContent : styles.lightModalContent
                ]}>
                  <View style={styles.modalHeader}>
                    <Text style={[
                      styles.modalTitle,
                      isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                    ]}>
                      Stock Market
                    </Text>
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={() => setShowStockMarket(false)}
                    >
                      <Text style={[
                        styles.closeButtonText, 
                        isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                      ]}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.stockContainer}>
                    <View style={[
                      styles.stockCard,
                      isDarkMode ? styles.darkCard : styles.lightCard
                    ]}>
                      <Text style={[
                        styles.stockSymbol,
                        isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                      ]}>
                        AAPL
                      </Text>
                      <Text style={styles.stockPrice}>$175.84</Text>
                      <Text style={styles.stockChange}>+2.45%</Text>
                    </View>

                    <View style={[
                      styles.stockCard,
                      isDarkMode ? styles.darkCard : styles.lightCard
                    ]}>
                      <Text style={[
                        styles.stockSymbol,
                        isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                      ]}>
                        GOOGL
                      </Text>
                      <Text style={styles.stockPrice}>$141.18</Text>
                      <Text style={styles.stockChange}>+1.89%</Text>
                    </View>

                    <View style={[
                      styles.stockCard,
                      isDarkMode ? styles.darkCard : styles.lightCard
                    ]}>
                      <Text style={[
                        styles.stockSymbol,
                        isDarkMode ? { color: '#e5e7eb' } : styles.lightText
                      ]}>
                        MSFT
                      </Text>
                      <Text style={styles.stockPrice}>$338.47</Text>
                      <Text style={styles.stockChange}>+0.95%</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {/* Add Transaction Modal */}
        <Modal
          visible={showAddTransaction}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAddTransaction(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[
              styles.modalContent, 
              isDarkMode ? styles.darkModalContent : styles.lightModalContent
            ]}>
              <View style={styles.modalHeader}>
                <Text style={[
                  styles.modalTitle, 
                  isDarkMode ? styles.darkText : styles.lightText
                ]}>
                  Add Transaction
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowAddTransaction(false)}
                >
                  <Text style={[
                    styles.closeButtonText, 
                    isDarkMode ? styles.darkText : styles.lightText
                  ]}>✕</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={[
                  styles.input,
                  isDarkMode ? styles.darkInput : styles.lightInput
                ]}
                placeholder="Enter Amount"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
                value={transactionAmount}
                onChangeText={setTransactionAmount}
                keyboardType="numeric"
              />

              {/* Transaction Type Selector */}
              <View style={styles.typeSelector}>
                {['expense', 'income', 'savings'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      transactionType === type && [
                        styles.selectedType,
                        { 
                          borderWidth: 2,
                          borderColor: isDarkMode ? '#818cf8' : '#6366f1',
                          shadowColor: isDarkMode ? '#818cf8' : '#6366f1',
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.5,
                          shadowRadius: 6,
                          elevation: 8
                        }
                      ],
                      { backgroundColor: type === 'expense' ? '#ef4444' : type === 'income' ? '#10b981' : '#6366f1' }
                    ]}
                    onPress={() => {
                      setTransactionType(type);
                      setSelectedMainCategory('');
                      setSelectedSubCategory('');
                    }}
                  >
                    <Text style={styles.typeButtonText}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Categories */}
              {transactionCategories[transactionType] && (
                <ScrollView style={styles.categorySection}>
                  <Text style={[
                    styles.sectionTitle, 
                    isDarkMode ? styles.darkText : styles.lightText
                  ]}>
                    Category
                  </Text>
                  <View style={styles.categoryGrid}>
                    {Object.keys(transactionCategories[transactionType]).map((mainCat) => (
                      <TouchableOpacity
                        key={mainCat}
                        style={[
                          styles.categoryCard,
                          selectedMainCategory === mainCat && [
                            styles.selectedCategoryCard,
                            {
                              borderWidth: 2,
                              borderColor: isDarkMode ? '#818cf8' : '#6366f1',
                              backgroundColor: isDarkMode ? '#374151' : '#fff',
                              shadowColor: isDarkMode ? '#818cf8' : '#6366f1',
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 0.5,
                              shadowRadius: 6,
                              elevation: 8
                            }
                          ],
                          isDarkMode ? styles.darkCurrencyButton : styles.lightCategoryCard
                        ]}
                        onPress={() => setSelectedMainCategory(mainCat)}
                      >
                        <Text style={[
                          styles.categoryCardText,
                          selectedMainCategory === mainCat && {
                            color: isDarkMode ? '#818cf8' : '#6366f1',
                            fontWeight: 'bold'
                          },
                          isDarkMode ? styles.darkText : styles.lightText
                        ]}>
                          {mainCat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    (!transactionAmount || !selectedMainCategory) && styles.disabledButton
                  ]}
                  disabled={!transactionAmount || !selectedMainCategory}
                  onPress={handleAddTransaction}
                >
                  <Text style={styles.addButtonText}>Add Transaction</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddTransaction(false);
                    setTransactionAmount('');
                    setSelectedMainCategory('');
                    setSelectedSubCategory('');
                    setTransactionType('expense');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {showReward && <RewardAnimation />}
        {renderCurrencyConverterModal()}
        {showAchievement && currentAchievement && (
          <AchievementDisplay 
            achievement={currentAchievement}
          />
        )}
      </LinearGradient>
    </ScrollView>
  );
};

export default HomeScreen;