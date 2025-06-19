// src/hooks/useGiftCards.ts

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  loadGiftCards,
  addGiftCard,
  updateGiftCard,
  deleteGiftCard,
  clearAllGiftCards,
  setSelectedCard,
  clearError,
  updateCardExpiration,
  sortCards,
} from '../store/giftCardSlice';
import { GiftCard, GiftCardFormData } from '../types';

export const useGiftCards = () => {
  const dispatch = useAppDispatch();
  const { cards, loading, error, selectedCard } = useAppSelector(
    state => state.giftCards,
  );

  // Load gift cards on mount
  useEffect(() => {
    dispatch(loadGiftCards());
  }, [dispatch]);

  // Update expiration status periodically (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCardExpiration());
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [dispatch]);

  // Actions
  const addCard = useCallback(
    async (formData: GiftCardFormData) => {
      const result = await dispatch(addGiftCard(formData));
      return result.meta.requestStatus === 'fulfilled';
    },
    [dispatch],
  );

  const updateCard = useCallback(
    async (id: string, formData: GiftCardFormData) => {
      const result = await dispatch(updateGiftCard({ id, formData }));
      return result.meta.requestStatus === 'fulfilled';
    },
    [dispatch],
  );

  const deleteCard = useCallback(
    async (cardId: string) => {
      const result = await dispatch(deleteGiftCard(cardId));
      return result.meta.requestStatus === 'fulfilled';
    },
    [dispatch],
  );

  const clearAllCards = useCallback(async () => {
    const result = await dispatch(clearAllGiftCards());
    return result.meta.requestStatus === 'fulfilled';
  }, [dispatch]);

  const selectCard = useCallback(
    (card: GiftCard | null) => {
      dispatch(setSelectedCard(card));
    },
    [dispatch],
  );

  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const sortCardsBy = useCallback(
    (sortBy: 'brand' | 'amount' | 'expirationDate' | 'createdAt') => {
      dispatch(sortCards(sortBy));
    },
    [dispatch],
  );

  const refreshCards = useCallback(() => {
    dispatch(loadGiftCards());
  }, [dispatch]);

  // Computed values
  const cardCount = cards.length;
  const totalValue = cards.reduce((sum, card) => sum + card.amount, 0);
  const expiredCards = cards.filter(card => card.isExpired);
  const activeCards = cards.filter(card => !card.isExpired);
  const expiredCount = expiredCards.length;
  const activeCount = activeCards.length;

  // Cards expiring soon (within 30 days)
  const expiringCards = cards.filter(card => {
    if (card.isExpired) return false;
    const daysUntilExpiration = Math.ceil(
      (new Date(card.expirationDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiration <= 30;
  });

  // Find card by ID
  const getCardById = useCallback(
    (id: string) => {
      return cards.find(card => card.id === id) || null;
    },
    [cards],
  );

  // Search cards
  const searchCards = useCallback(
    (query: string) => {
      if (!query.trim()) return cards;

      const lowercaseQuery = query.toLowerCase().trim();
      return cards.filter(card =>
        card.brand.toLowerCase().includes(lowercaseQuery),
      );
    },
    [cards],
  );

  // Filter cards by status
  const filterCardsByStatus = useCallback(
    (status: 'all' | 'active' | 'expired' | 'expiring') => {
      switch (status) {
        case 'active':
          return activeCards;
        case 'expired':
          return expiredCards;
        case 'expiring':
          return expiringCards;
        default:
          return cards;
      }
    },
    [cards, activeCards, expiredCards, expiringCards],
  );

  return {
    // State
    cards,
    loading,
    error,
    selectedCard,

    // Actions
    addCard,
    updateCard,
    deleteCard,
    clearAllCards,
    selectCard,
    dismissError,
    sortCardsBy,
    refreshCards,

    // Computed values
    cardCount,
    totalValue,
    expiredCount,
    activeCount,
    expiringCards,

    // Utilities
    getCardById,
    searchCards,
    filterCardsByStatus,
  };
};
