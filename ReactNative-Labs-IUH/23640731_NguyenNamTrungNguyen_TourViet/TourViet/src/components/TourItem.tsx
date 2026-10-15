import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { formatDate, getSeatLabel } from '../utils/tour';

export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

function TourItem({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}: TourItemProps) {
  const handleFavoritePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleFavorite(tour.id, !tour.isFavorite);
  };

  return (
    <View style={[styles.card, compact ? styles.compactCard : styles.rowCard]}>
      <TouchableOpacity
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`Chi tiết tour ${tour.name}`}
        onPress={() => onPress(tour)}
        style={compact ? styles.compactContent : styles.rowContent}
      >
        <View style={compact ? styles.compactImageFrame : styles.rowImageFrame}>
          <Image
            source={{ uri: tour.image }}
            resizeMode="cover"
            style={styles.image}
            accessibilityLabel={`Ảnh ${tour.name}`}
          />
        </View>

        <View style={compact ? styles.compactDetails : styles.rowDetails}>
          <Text numberOfLines={compact ? 1 : 2} style={styles.name}>
            {tour.name}
          </Text>
          <Text style={styles.price}>{tour.price.toLocaleString('vi-VN')} ₫</Text>
          {!compact && (
            <>
              <Text style={styles.secondaryText}>{tour.city}</Text>
              <Text style={styles.secondaryText}>
                📅 {formatDate(tour.departure)} · {tour.days} ngày
              </Text>
              <Text
                style={[
                  styles.seatText,
                  tour.seats <= 3 && styles.lowSeatText,
                ]}
              >
                {getSeatLabel(tour.seats)}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        testID="fav-btn"
        accessibilityRole="button"
        accessibilityLabel={tour.isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        activeOpacity={0.75}
        onPress={handleFavoritePress}
        style={[
          styles.favoriteButton,
          compact ? styles.favoriteOverlay : styles.favoriteInRow,
        ]}
      >
        <Text style={[styles.favoriteIcon, tour.isFavorite && styles.favoriteActive]}>
          {tour.isFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(TourItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EDF2',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  rowCard: {
    flexDirection: 'row',
    minHeight: 116,
    padding: 12,
  },
  compactCard: {
    width: 160,
  },
  rowContent: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    minWidth: 0,
  },
  compactContent: {
    width: '100%',
  },
  rowImageFrame: {
    borderRadius: 12,
    height: 90,
    overflow: 'hidden',
    width: 90,
  },
  compactImageFrame: {
    aspectRatio: 4 / 3,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  rowDetails: {
    flex: 1,
    gap: 3,
    minWidth: 0,
    paddingRight: 2,
  },
  compactDetails: {
    gap: 5,
    padding: 10,
  },
  name: {
    color: '#172B4D',
    fontSize: 15,
    fontWeight: '700',
  },
  price: {
    color: '#087E75',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#667085',
    fontSize: 12,
  },
  seatText: {
    color: '#087E75',
    fontSize: 12,
    fontWeight: '600',
  },
  lowSeatText: {
    color: '#C62828',
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  favoriteInRow: {
    alignSelf: 'center',
    marginLeft: 6,
  },
  favoriteOverlay: {
    elevation: 2,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  favoriteIcon: {
    color: '#64748B',
    fontSize: 22,
    lineHeight: 25,
  },
  favoriteActive: {
    color: '#E5484D',
  },
});
