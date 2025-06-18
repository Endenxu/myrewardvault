// src/screens/Home.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGiftCards } from '../hooks/useGiftCards';
import { storageService } from '../services/storageService';
import HomeHeader from '../components/home/HomeHeader';
import GiftCardItem from '../components/giftcard/GiftCardItem';
import EmptyState from '../components/common/EmptyState';
import FloatingActionButton from '../components/common/FloatingActionButton';
import AddGiftCardModal from '../components/modals/AddGiftCardModal';
import GiftCardDetailModal from '../components/modals/GiftCardDetailModal';
import { GiftCard } from '../types';
import { colors, spacing } from '../constants/theme';

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

  // Load user name on mount
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
          // Don't show alert here, the delete confirmation already handles feedback
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
              } catch (error) {
                // Error already handled in handleDeleteCard
              }
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

  const handleAddCardSuccess = useCallback(() => {
    // Modal will close automatically, and the list will refresh via Redux
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false);
    selectCard(null); // Clear selected card
  }, [selectCard]);

  const handleDetailModalUpdate = useCallback(() => {
    // Refresh cards list after update
    refreshCards();
  }, [refreshCards]);

  const handleSearch = useCallback(() => {
    // TODO: Implement search functionality
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

  const renderEmptyState = () => (
    <EmptyState
      icon="credit-card"
      title="No Gift Cards Yet"
      subtitle="Start building your digital wallet by adding your first gift card"
      buttonText="Add Your First Card"
      onButtonPress={handleAddCard}
    />
  );

  const renderContent = () => {
    if (cardCount === 0) {
      return renderEmptyState();
    }

    return (
      <FlatList
        data={cards}
        renderItem={renderGiftCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 160, // Approximate item height
          offset: 160 * index,
          index,
        })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <HomeHeader
        userName={userName}
        totalValue={totalValue}
        cardCount={cardCount}
        expiredCount={expiredCount}
        onSearchPress={handleSearch}
        onSortPress={handleSort}
      />

      <View style={styles.content}>{renderContent()}</View>

      {cardCount > 0 && (
        <FloatingActionButton onPress={handleAddCard} icon="add" />
      )}

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing['4xl'],
  },
});

export default HomeScreen;
