// src/types/index.ts

export interface GiftCard {
  id: string;
  brand: string;
  amount: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
  isExpired?: boolean;
}

export interface GiftCardFormData {
  brand: string;
  amount: string;
  expirationDate: string;
}

export interface GiftCardState {
  cards: GiftCard[];
  loading: boolean;
  error: string | null;
  selectedCard: GiftCard | null;
}

export interface RootState {
  giftCards: GiftCardState;
}

// Navigation types
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  GiftCardDetails: { cardId: string };
  AddGiftCard: undefined;
  EditGiftCard: { cardId: string };
};

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Storage types
export interface StorageKeys {
  GIFT_CARDS: string;
  USER_NAME: string;
}

// API Response types (Maybe?)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
