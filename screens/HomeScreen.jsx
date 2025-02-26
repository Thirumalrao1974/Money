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
import { ACHIEVEMENTS } from '../constants/Achievements';

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
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  streakInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  freezeText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10,
  },
  darkModeCard: {
    backgroundColor: '#374151',
  },
  darkModeText: {
    color: '#e5e7eb',
  },
  visualizationCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  distributionBar: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginTop: 10,
  },
  barSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noDataText: {
    flex: 1,
    textAlign: 'center',
    color: '#6b7280',
    paddingVertical: 10,
  },
  visualizationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
});

const HomeScreen = () => {
  // Add missing state variables
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [name, setName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  // Update handleNameSubmit
  const handleNameSubmit = async () => {
    if (name.trim()) {
      try {
        await AsyncStorage.setItem('userName', name);
        setName(name);
        setShowOnboarding(false); // Now this will work
        setStreak(0);
        await AsyncStorage.setItem('streak', '0');
      } catch (error) {
        console.error('Error saving name:', error);
      }
    }
  };

  // Update stock market navigation
  const handleStockMarketPress = () => {
    try {
      if (!navigation) {
        console.error('Navigation is not available');
        return;
      }
      navigation.navigate('StockMarket', { 
        isDarkMode,
        onStockSelect: (stock) => {
          navigation.navigate('StockDetails', {
            stock,
            isDarkMode,
            API_KEY: 'cuv906pr01qpi6ru1kfgcuv906pr01qpi6ru1kg0'
          });
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to open stock market. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={isDarkMode ? ['#1f2937', '#111827'] : ['#ffffff', '#f3f4f6']}
        style={styles.gradient}
      >
        {/* Update the stock market button */}
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleStockMarketPress}
        >
          <MaterialCommunityIcons 
            name="chart-line" 
            size={24} 
            color={isDarkMode ? '#818cf8' : '#6366f1'} 
          />
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default HomeScreen;