// src/store/giftCardSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GiftCard, GiftCardState, GiftCardFormData } from '../types';
import { storageService } from '../services/storageService';
import uuid from 'react-native-uuid';

// Initial state
const initialState: GiftCardState = {
  cards: [],
  loading: false,
  error: null,
  selectedCard: null,
};

// Async thunks for storage operations
export const loadGiftCards = createAsyncThunk(
  'giftCards/load',
  async (_, { rejectWithValue }) => {
    try {
      const cards = await storageService.loadGiftCards();
      return cards;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load gift cards',
      );
    }
  },
);

export const addGiftCard = createAsyncThunk(
  'giftCards/add',
  async (formData: GiftCardFormData, { rejectWithValue }) => {
    try {
      const now = new Date().toISOString();
      const newCard: GiftCard = {
        id: uuid.v4() as string,
        brand: formData.brand.trim(),
        amount: parseFloat(formData.amount),
        expirationDate: formData.expirationDate,
        createdAt: now,
        updatedAt: now,
        isExpired: new Date(formData.expirationDate) < new Date(),
      };

      await storageService.addGiftCard(newCard);
      return newCard;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to add gift card',
      );
    }
  },
);

export const updateGiftCard = createAsyncThunk(
  'giftCards/update',
  async (
    { id, formData }: { id: string; formData: GiftCardFormData },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as { giftCards: GiftCardState };
      const existingCard = state.giftCards.cards.find(card => card.id === id);

      if (!existingCard) {
        return rejectWithValue('Gift card not found');
      }

      const updatedCard: GiftCard = {
        ...existingCard,
        brand: formData.brand.trim(),
        amount: parseFloat(formData.amount),
        expirationDate: formData.expirationDate,
        updatedAt: new Date().toISOString(),
        isExpired: new Date(formData.expirationDate) < new Date(),
      };

      await storageService.updateGiftCard(updatedCard);
      return updatedCard;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update gift card',
      );
    }
  },
);

export const deleteGiftCard = createAsyncThunk(
  'giftCards/delete',
  async (cardId: string, { rejectWithValue }) => {
    try {
      await storageService.deleteGiftCard(cardId);
      return cardId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete gift card',
      );
    }
  },
);

export const clearAllGiftCards = createAsyncThunk(
  'giftCards/clearAll',
  async (_, { rejectWithValue }) => {
    try {
      await storageService.clearAllGiftCards();
      return;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to clear gift cards',
      );
    }
  },
);

// Create slice
const giftCardSlice = createSlice({
  name: 'giftCards',
  initialState,
  reducers: {
    // Synchronous actions
    setSelectedCard: (state, action: PayloadAction<GiftCard | null>) => {
      state.selectedCard = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    updateCardExpiration: state => {
      // Update expiration status for all cards
      const now = new Date();
      state.cards.forEach(card => {
        card.isExpired = new Date(card.expirationDate) < now;
      });
    },
    sortCards: (
      state,
      action: PayloadAction<
        'brand' | 'amount' | 'expirationDate' | 'createdAt'
      >,
    ) => {
      const sortBy = action.payload;
      state.cards.sort((a, b) => {
        switch (sortBy) {
          case 'brand':
            return a.brand.localeCompare(b.brand);
          case 'amount':
            return b.amount - a.amount; // Highest amount first
          case 'expirationDate':
            return (
              new Date(a.expirationDate).getTime() -
              new Date(b.expirationDate).getTime()
            );
          case 'createdAt':
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ); // Newest first
          default:
            return 0;
        }
      });
    },
  },
  extraReducers: builder => {
    // Load gift cards
    builder
      .addCase(loadGiftCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGiftCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
        state.error = null;
      })
      .addCase(loadGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add gift card
    builder
      .addCase(addGiftCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
        state.error = null;
      })
      .addCase(addGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update gift card
    builder
      .addCase(updateGiftCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cards.findIndex(
          card => card.id === action.payload.id,
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        if (state.selectedCard?.id === action.payload.id) {
          state.selectedCard = action.payload;
        }
        state.error = null;
      })
      .addCase(updateGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete gift card
    builder
      .addCase(deleteGiftCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter(card => card.id !== action.payload);
        if (state.selectedCard?.id === action.payload) {
          state.selectedCard = null;
        }
        state.error = null;
      })
      .addCase(deleteGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Clear all gift cards
    builder
      .addCase(clearAllGiftCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearAllGiftCards.fulfilled, state => {
        state.loading = false;
        state.cards = [];
        state.selectedCard = null;
        state.error = null;
      })
      .addCase(clearAllGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setSelectedCard, clearError, updateCardExpiration, sortCards } =
  giftCardSlice.actions;

// Export reducer
export default giftCardSlice.reducer;
