// src/constants/brands.ts

export interface BrandConfig {
  name: string;
  gradient: [string, string];
  category:
    | 'retail'
    | 'tech'
    | 'food'
    | 'entertainment'
    | 'transport'
    | 'finance'
    | 'home';
}

export const GIFT_CARD_BRANDS: BrandConfig[] = [
  // Retail
  {
    name: 'Amazon',
    gradient: ['#FF9900', '#FF7700'],
    category: 'retail',
  },
  {
    name: 'Target',
    gradient: ['#CC0000', '#990000'],
    category: 'retail',
  },
  {
    name: 'Walmart',
    gradient: ['#004C91', '#0071CE'],
    category: 'retail',
  },
  {
    name: 'Best Buy',
    gradient: ['#0046BE', '#003399'],
    category: 'retail',
  },
  {
    name: 'Costco',
    gradient: ['#E31837', '#C41429'],
    category: 'retail',
  },

  // Tech
  {
    name: 'Apple',
    gradient: ['#000000', '#333333'],
    category: 'tech',
  },
  {
    name: 'Steam',
    gradient: ['#1B2838', '#171A21'],
    category: 'tech',
  },
  {
    name: 'Xbox',
    gradient: ['#107C10', '#0E6B0E'],
    category: 'tech',
  },

  // Food & Beverages
  {
    name: 'Starbucks',
    gradient: ['#00704A', '#003D21'],
    category: 'food',
  },
  {
    name: "McDonald's",
    gradient: ['#FFC72C', '#DA020E'],
    category: 'food',
  },
  {
    name: 'Subway',
    gradient: ['#00543C', '#004225'],
    category: 'food',
  },

  // Transport & Delivery
  {
    name: 'Uber',
    gradient: ['#000000', '#333333'],
    category: 'transport',
  },
  {
    name: 'Lyft',
    gradient: ['#FF00BF', '#E619AC'],
    category: 'transport',
  },
  {
    name: 'DoorDash',
    gradient: ['#FF3008', '#E02B00'],
    category: 'transport',
  },

  // Home & Hardware
  {
    name: 'Home Depot',
    gradient: ['#F96302', '#D85100'],
    category: 'home',
  },
  {
    name: "Lowe's",
    gradient: ['#004990', '#003C7A'],
    category: 'home',
  },
];

// Helper functions for easy brand operations
export const getBrandNames = (): string[] => {
  return GIFT_CARD_BRANDS.map(brand => brand.name);
};

export const getBrandGradient = (brandName: string): [string, string] => {
  const brand = GIFT_CARD_BRANDS.find(b =>
    b.name.toLowerCase().includes(brandName.toLowerCase()),
  );
  return brand?.gradient || ['#6366F1', '#8B5CF6'];
};

export const searchBrands = (query: string): BrandConfig[] => {
  if (!query.trim()) return GIFT_CARD_BRANDS;

  return GIFT_CARD_BRANDS.filter(brand =>
    brand.name.toLowerCase().includes(query.toLowerCase()),
  );
};

export const getPopularBrands = (limit?: number): string[] => {
  const popularOrder = [
    'Amazon',
    'Apple',
    'Starbucks',
    'Target',
    'Walmart',
    'Best Buy',
    'Steam',
    'Xbox',
  ];

  const popular = popularOrder.filter(name =>
    GIFT_CARD_BRANDS.some(brand => brand.name === name),
  );

  const remaining = getBrandNames().filter(
    name => !popularOrder.includes(name),
  );
  const allBrands = [...popular, ...remaining];

  return limit ? allBrands.slice(0, limit) : allBrands;
};

export default GIFT_CARD_BRANDS;
