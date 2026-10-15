import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TourItem from '../components/TourItem';
import { API_URL } from '../constants/api';
import type { Tour } from '../interfaces/Tour';
import { formatDate, groupByCity, type TourSection } from '../utils/tour';

export default function TourScreen() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    try {
      setLoadError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: unknown = await response.json();
      if (!Array.isArray(data)) throw new Error('Dữ liệu tour không hợp lệ');
      setTours(data as Tour[]);
    } catch {
      setLoadError('Không thể tải danh sách tour. Vui lòng thử làm mới.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTours();
  }, [fetchTours]);

  const filteredTours = useMemo(() => {
    const searchTerm = searchText.trim().toLocaleLowerCase();
    if (!searchTerm) return tours;

    return tours.filter((tour) =>
      tour.name.toLocaleLowerCase().includes(searchTerm),
    );
  }, [searchText, tours]);

  const sections = useMemo(() => groupByCity(filteredTours), [filteredTours]);
  const favoriteTours = useMemo(
    () => tours.filter((tour) => tour.isFavorite),
    [tours],
  );

  const refreshTours = useCallback(async () => {
    setRefreshing(true);
    await fetchTours();
    setRefreshing(false);
  }, [fetchTours]);

  const toggleFavorite = useCallback(async (id: string, next: boolean) => {
    let previous: boolean | undefined;

    setTours((currentTours) =>
      currentTours.map((tour) => {
        if (tour.id === id) {
          previous = tour.isFavorite;
          return { ...tour, isFavorite: next };
        }
        return tour;
      }),
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch {
      if (previous !== undefined) {
        setTours((currentTours) =>
          currentTours.map((tour) =>
            tour.id === id ? { ...tour, isFavorite: previous! } : tour,
          ),
        );
      }
      Alert.alert('Không thể cập nhật', 'Vui lòng kiểm tra kết nối và thử lại.');
    }
  }, []);

  const showTourDetails = useCallback((tour: Tour) => {
    Alert.alert(
      tour.name,
      `Khởi hành: ${formatDate(tour.departure)}\nSố ngày: ${tour.days} ngày\nGiá: ${tour.price.toLocaleString('vi-VN')} ₫`,
    );
  }, []);

  const renderFavorites = useCallback(
    () => (
      <View style={styles.favoritesSection}>
        <Text style={styles.sectionTitle}>
          Tour yêu thích ({favoriteTours.length})
        </Text>
        {favoriteTours.length > 0 ? (
          <FlatList<Tour>
            horizontal
            data={favoriteTours}
            keyExtractor={(tour) => tour.id}
            renderItem={({ item }) => (
              <TourItem
                tour={item}
                compact
                onPress={showTourDetails}
                onToggleFavorite={toggleFavorite}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.favoriteSeparator} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoriteListContent}
            ListEmptyComponent={null}
          />
        ) : (
          <Text style={styles.noFavorites}>Chưa có tour yêu thích</Text>
        )}
      </View>
    ),
    [favoriteTours, showTourDetails, toggleFavorite],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Tour Việt</Text>
        <Text style={styles.studentLine}>23640731 – Nguyễn Nam Trung Nguyên</Text>
        <TextInput
          accessibilityLabel="Tìm tour theo tên"
          placeholder="Tìm tour theo tên..."
          placeholderTextColor="#98A2B3"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={styles.searchInput}
        />
      </View>

      {loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#087E75" />
          <Text style={styles.loadingText}>Đang tải tour...</Text>
        </View>
      ) : (
        <SectionList<Tour, TourSection>
          sections={sections}
          keyExtractor={(tour) => tour.id}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              onPress={showTourDetails}
              onToggleFavorite={toggleFavorite}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.cityHeader}>
              <Text style={styles.cityTitle}>
                {section.title} · {section.data.length} tour
              </Text>
            </View>
          )}
          ListHeaderComponent={renderFavorites}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
          }
          ListFooterComponent={<View style={styles.listBottomSpace} />}
          stickySectionHeadersEnabled
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshTours}
              tintColor="#087E75"
              colors={['#087E75']}
            />
          }
          contentContainerStyle={styles.listContent}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E8EDF2',
    borderBottomWidth: 1,
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  title: {
    color: '#123B36',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  studentLine: {
    color: '#667085',
    fontSize: 13,
    marginTop: 3,
  },
  searchInput: {
    backgroundColor: '#F5F7FA',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    color: '#172B4D',
    fontSize: 15,
    height: 46,
    marginTop: 14,
    paddingHorizontal: 14,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#667085',
    fontSize: 14,
  },
  errorText: {
    backgroundColor: '#FFF4F2',
    color: '#B42318',
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 10,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  favoritesSection: {
    paddingBottom: 22,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#172B4D',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  favoriteListContent: {
    paddingRight: 16,
  },
  favoriteSeparator: {
    width: 12,
  },
  noFavorites: {
    color: '#8A94A6',
    fontSize: 14,
    paddingBottom: 4,
  },
  cityHeader: {
    backgroundColor: '#F5F7FA',
    paddingBottom: 9,
    paddingTop: 10,
  },
  cityTitle: {
    color: '#123B36',
    fontSize: 16,
    fontWeight: '700',
  },
  itemSeparator: {
    height: 10,
  },
  sectionSeparator: {
    height: 8,
  },
  emptyText: {
    color: '#667085',
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 28,
    textAlign: 'center',
  },
  listBottomSpace: {
    height: 28,
  },
});
