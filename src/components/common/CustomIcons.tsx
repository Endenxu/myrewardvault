// src/components/common/CustomIcons.tsx

import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polygon } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

// ========== EXISTING ICONS ==========

export const CreditCardIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  </View>
);

export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="m21 21-4.35-4.35"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const FilterIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  </View>
);

export const TrashIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M12 6v6l4 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const ChevronRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

export const AlertCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" />
      <Line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

// ========== NEW MISSING ICONS ==========

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" />
      <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" />
      <Path d="M12 19l-7-7 7-7" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  </View>
);

export const ShareIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
      <Circle
        cx="18"
        cy="19"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line
        x1="8.59"
        y1="13.51"
        x2="15.42"
        y2="17.49"
        stroke={color}
        strokeWidth="2"
      />
      <Line
        x1="15.41"
        y1="6.51"
        x2="8.59"
        y2="10.49"
        stroke={color}
        strokeWidth="2"
      />
    </Svg>
  </View>
);

export const EditIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const StoreIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M9 22V12h6v10" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const MoneyIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" />
      <Path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const CalendarIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M22 4L12 14.01l-3-3" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const WarningIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" />
      <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const TagIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx="7" cy="7" r="1" fill={color} />
    </Svg>
  </View>
);

export const DollarSignIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" />
      <Path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const ClockTickIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M12 6v6l4 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const PlusCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" />
      <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const InfoIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth="2" />
      <Line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

export const ShoppingBagIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" />
      <Path
        d="M16 10a4 4 0 0 1-8 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Alternative expiration icon - Calendar with X
export const CalendarXIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
      <Line x1="10" y1="14" x2="14" y2="18" stroke={color} strokeWidth="2" />
      <Line x1="14" y1="14" x2="10" y2="18" stroke={color} strokeWidth="2" />
    </Svg>
  </View>
);

// Sparkle icon for special occasions or premium cards
export const SparkleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <View style={[{ width: size, height: size }, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
      <Path
        d="M19 12l0.5 1.5L21 14.5l-1.5 0.5L19 17l-0.5-1.5L17 14.5l1.5-0.5L19 12z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
      <Path
        d="M5 19l0.5 1.5L7 21.5l-1.5 0.5L5 24l-0.5-1.5L3 21.5l1.5-0.5L5 19z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
    </Svg>
  </View>
);
