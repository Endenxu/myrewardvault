// src/services/storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftCard } from '../types';

export const STORAGE_KEYS = {
  GIFT_CARDS: '@gift_cards',
  USER_NAME: '@user_name',
} as const;

class StorageService {
  // Gift Cards
  async saveGiftCards(cards: GiftCard[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(cards);
      await AsyncStorage.setItem(STORAGE_KEYS.GIFT_CARDS, jsonValue);
    } catch (error) {
      console.error('Error saving gift cards:', error);
      throw new Error('Failed to save gift cards');
    }
  }

  async loadGiftCards(): Promise<GiftCard[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.GIFT_CARDS);
      if (jsonValue === null) {
        return [];
      }
      const cards: GiftCard[] = JSON.parse(jsonValue);

      // Add computed properties
      return cards.map(card => ({
        ...card,
        isExpired: new Date(card.expirationDate) < new Date(),
      }));
    } catch (error) {
      console.error('Error loading gift cards:', error);
      throw new Error('Failed to load gift cards');
    }
  }

  async addGiftCard(card: GiftCard): Promise<void> {
    try {
      const existingCards = await this.loadGiftCards();
      const updatedCards = [...existingCards, card];
      await this.saveGiftCards(updatedCards);
    } catch (error) {
      console.error('Error adding gift card:', error);
      throw new Error('Failed to add gift card');
    }
  }

  async updateGiftCard(updatedCard: GiftCard): Promise<void> {
    try {
      const existingCards = await this.loadGiftCards();
      const updatedCards = existingCards.map(card =>
        card.id === updatedCard.id ? updatedCard : card,
      );
      await this.saveGiftCards(updatedCards);
    } catch (error) {
      console.error('Error updating gift card:', error);
      throw new Error('Failed to update gift card');
    }
  }

  async deleteGiftCard(cardId: string): Promise<void> {
    try {
      const existingCards = await this.loadGiftCards();
      const filteredCards = existingCards.filter(card => card.id !== cardId);
      await this.saveGiftCards(filteredCards);
    } catch (error) {
      console.error('Error deleting gift card:', error);
      throw new Error('Failed to delete gift card');
    }
  }

  async clearAllGiftCards(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.GIFT_CARDS);
    } catch (error) {
      console.error('Error clearing gift cards:', error);
      throw new Error('Failed to clear gift cards');
    }
  }

  // User Data
  async saveUserName(name: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    } catch (error) {
      console.error('Error saving user name:', error);
      throw new Error('Failed to save user name');
    }
  }

  async loadUserName(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
    } catch (error) {
      console.error('Error loading user name:', error);
      return null;
    }
  }

  // General utility methods
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw new Error('Failed to clear all data');
    }
  }

  async getStorageInfo(): Promise<{ keys: string[]; size: number }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      // Calculate approximate size
      let totalSize = 0;
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      return { keys: [...keys], size: totalSize };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { keys: [], size: 0 };
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
