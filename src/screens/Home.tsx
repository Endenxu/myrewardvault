// src/screens/Home.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useGiftCards } from '../hooks/useGiftCards';
import { storageService } from '../services/storageService';
import GiftCardItem from '../components/giftcard/GiftCardItem';
import EmptyState from '../components/common/EmptyState';
import FloatingActionButton from '../components/common/FloatingActionButton';
import AddGiftCardModal from '../components/modals/AddGiftCardModal';
import GiftCardDetailModal from '../components/modals/GiftCardDetailModal';
import { SearchIcon, FilterIcon } from '../components/common/CustomIcons';
import { GiftCard } from '../types';
import { colors } from '../constants/theme';

const HomeScreen: React.FC = () => {
  const {
    cards,
    loading,
    error,
    cardCount,
    totalValue,
    expiredCount,
    deleteCard,
    refreshCards,
    sortCardsBy,
    selectCard,
    selectedCard,
  } = useGiftCards();

  const [userName, setUserName] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  React.useEffect(() => {
    const loadUserName = async () => {
      try {
        const name = await storageService.loadUserName();
        setUserName(name);
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };
    loadUserName();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshCards();
    } finally {
      setRefreshing(false);
    }
  }, [refreshCards]);

  const handleCardPress = useCallback(
    (card: GiftCard) => {
      selectCard(card);
      setShowDetailModal(true);
    },
    [selectCard],
  );

  const handleDeleteCard = useCallback(
    async (cardId: string) => {
      try {
        const success = await deleteCard(cardId);
        if (success) {
          return success;
        }
        throw new Error('Delete failed');
      } catch (error) {
        Alert.alert('Error', 'Failed to delete gift card');
        throw error;
      }
    },
    [deleteCard],
  );

  const handleDetailModalDelete = useCallback(
    async (cardId: string) => {
      const cardToDelete = cards.find(c => c.id === cardId);
      if (!cardToDelete) return;

      Alert.alert(
        'Delete Gift Card',
        `Are you sure you want to delete the ${cardToDelete.brand} gift card? This action cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await handleDeleteCard(cardId);
                Alert.alert('Success', 'Gift card deleted successfully');
                setShowDetailModal(false);
              } catch (error) {}
            },
          },
        ],
      );
    },
    [cards, handleDeleteCard],
  );

  const handleAddCard = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const handleAddCardSuccess = useCallback(() => {}, []);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false);
    selectCard(null);
  }, [selectCard]);

  const handleDetailModalUpdate = useCallback(() => {
    refreshCards();
  }, [refreshCards]);

  const handleSearch = useCallback(() => {
    Alert.alert('Search', 'Search functionality coming soon!');
  }, []);

  const handleSort = useCallback(() => {
    Alert.alert('Sort Cards', 'Choose sorting option:', [
      { text: 'By Brand', onPress: () => sortCardsBy('brand') },
      { text: 'By Amount', onPress: () => sortCardsBy('amount') },
      { text: 'By Expiration', onPress: () => sortCardsBy('expirationDate') },
      { text: 'By Date Added', onPress: () => sortCardsBy('createdAt') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [sortCardsBy]);

  const renderGiftCard = useCallback(
    ({ item }: { item: GiftCard }) => (
      <GiftCardItem
        card={item}
        onPress={() => handleCardPress(item)}
        onDelete={() => handleDeleteCard(item.id)}
      />
    ),
    [handleCardPress, handleDeleteCard],
  );

  const keyExtractor = useCallback((item: GiftCard) => item.id, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      {/* Header */}
      <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.greetingRow}>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
              <Text style={styles.nameText}>{userName || 'Hugh'}!</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={handleSearch} style={styles.actionBtn}>
                <SearchIcon size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSort} style={styles.actionBtn}>
                <FilterIcon size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.walletCard}>
            <Text style={styles.totalLabel}>Total Giftcard Balance</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(totalValue || 0)}
            </Text>
            <Text style={styles.cardInfo}>
              {cardCount} {cardCount === 1 ? 'Card' : 'Cards'}
              {expiredCount > 0 && ` • ${expiredCount} Expired`}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {cardCount === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              icon="credit-card"
              title="No Gift Cards Yet"
              subtitle="Start building your digital wallet by adding your first gift card"
              buttonText="Add Your First Card"
              onButtonPress={handleAddCard}
            />
          </View>
        ) : (
          <FlatList
            data={cards}
            renderItem={renderGiftCard}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#6366F1']}
                tintColor="#6366F1"
              />
            }
          />
        )}
      </View>

      <FloatingActionButton onPress={handleAddCard} icon="add" size={56} />

      <AddGiftCardModal
        visible={showAddModal}
        onClose={handleCloseAddModal}
        onSuccess={handleAddCardSuccess}
      />

      <GiftCardDetailModal
        visible={showDetailModal}
        card={selectedCard}
        onClose={handleCloseDetailModal}
        onDelete={handleDetailModalDelete}
        onUpdate={handleDetailModalUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  headerContent: {
    paddingTop: 60,
    gap: 10,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 40,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  list: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

export default HomeScreen;
