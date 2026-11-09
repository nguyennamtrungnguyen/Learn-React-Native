import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToLevel1Cart,
  removeFromLevel1Cart,
  clearLevel1Cart,
} from '../slices/level1CartSlice';
import { RootState } from '../store';

const SAMPLE_PRODUCTS = [
  { name: 'Laptop', price: 1000, icon: '💻' },
  { name: 'Mouse', price: 25, icon: '🖱️' },
  { name: 'Headphones', price: 120, icon: '🎧' },
];

export default function Level1Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.level1Cart.items);

  const handleAddProduct = (name: string, price: number) => {
    dispatch(
      addToLevel1Cart({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,
        price,
      })
    );
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromLevel1Cart(id));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LEVEL 1 • CƠ BẢN</Text>
        </View>
        <Text style={styles.title}>📦 Giỏ Hàng Cơ Bản</Text>
        <Text style={styles.subtitle}>
          Làm quen với Store, Slice, Actions (addToCart, removeFromCart, clearCart)
          và useSelector / useDispatch.
        </Text>
      </View>

      {/* Nút Thêm Sản Phẩm */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Thêm Sản Phẩm Mẫu</Text>
        <TouchableOpacity
          style={styles.primaryAddBtn}
          onPress={() => handleAddProduct('Laptop', 1000)}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryAddBtnText}>+ Thêm Laptop ($1000)</Text>
        </TouchableOpacity>

        <View style={styles.quickButtonsRow}>
          {SAMPLE_PRODUCTS.slice(1).map((product) => (
            <TouchableOpacity
              key={product.name}
              style={styles.secondaryAddBtn}
              onPress={() => handleAddProduct(product.name, product.price)}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryAddBtnText}>
                {product.icon} + {product.name} (${product.price})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Danh Sách Sản Phẩm Trong Giỏ */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Sản phẩm trong giỏ ({cartItems.length})
          </Text>
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => dispatch(clearLevel1Cart())}
            >
              <Text style={styles.clearBtnText}>Xóa Tất Cả</Text>
            </TouchableOpacity>
          )}
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>
              Chưa có sản phẩm nào trong giỏ hàng
            </Text>
            <Text style={styles.emptySubtext}>
              Nhấn &ldquo;Thêm Laptop&rdquo; ở trên để dispatch action addToCart
            </Text>
          </View>
        ) : (
          cartItems.map((item, index) => (
            <View key={item.id} style={styles.cartItemRow}>
              <View style={styles.itemLeft}>
                <View style={styles.indexCircle}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleRemoveProduct(item.id)}
              >
                <Text style={styles.deleteBtnText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#4338CA',
    lineHeight: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  primaryAddBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryAddBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryAddBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryAddBtnText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  emptyIcon: {
    fontSize: 38,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12.5,
    color: '#94A3B8',
    textAlign: 'center',
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indexCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemPrice: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '700',
    marginTop: 2,
  },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  clearBtnText: {
    color: '#B91C1C',
    fontSize: 12.5,
    fontWeight: '700',
  },
});
