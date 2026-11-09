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
  addToLevel2Cart,
  increaseLevel2Quantity,
  decreaseLevel2Quantity,
  removeFromLevel2Cart,
  clearLevel2Cart,
  selectLevel2CartItems,
  selectLevel2CartTotal,
  selectLevel2CartItemCount,
} from '../slices/level2CartSlice';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1000, icon: '💻' },
  { id: 2, name: 'Mouse', price: 25, icon: '🖱️' },
  { id: 3, name: 'Keyboard', price: 80, icon: '⌨️' },
  { id: 4, name: 'Monitor 4K', price: 350, icon: '🖥️' },
];

export default function Level2Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectLevel2CartItems);
  const totalPrice = useSelector(selectLevel2CartTotal);
  const itemCount = useSelector(selectLevel2CartItemCount);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LEVEL 2 • NÂNG CAO</Text>
        </View>
        <Text style={styles.title}>🛒 Giỏ Hàng Nâng Cao</Text>
        <Text style={styles.subtitle}>
          Tự động cộng dồn số lượng khi trùng ID, tăng/giảm số lượng và dùng
          Selectors tính tổng tiền & tổng sản phẩm.
        </Text>
      </View>

      {/* Danh Sách Sản Phẩm */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Danh Sách Sản Phẩm</Text>
        <View style={styles.productGrid}>
          {PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productBtn}
              onPress={() =>
                dispatch(
                  addToLevel2Cart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                  })
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.productIcon}>{product.icon}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <View style={styles.addChip}>
                <Text style={styles.addChipText}>+ Thêm vào giỏ</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Giỏ Hàng */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Giỏ Hàng ({itemCount} sản phẩm)
          </Text>
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => dispatch(clearLevel2Cart())}
            >
              <Text style={styles.clearBtnText}>Xóa Tất Cả</Text>
            </TouchableOpacity>
          )}
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
            <Text style={styles.emptySubtext}>
              Chọn sản phẩm phía trên (bấm nhiều lần cùng 1 sản phẩm để xem số
              lượng tự động tăng)
            </Text>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.name} <Text style={styles.itemQtyBadge}>x {item.quantity}</Text>
                  </Text>
                  <Text style={styles.itemUnitText}>
                    Đơn giá: ${item.price} • Thành tiền:{' '}
                    <Text style={styles.itemSubtotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Text>
                </View>

                <View style={styles.controlsRow}>
                  <View style={styles.qtyGroup}>
                    <TouchableOpacity
                      style={[
                        styles.qtyBtn,
                        item.quantity <= 1 && styles.qtyBtnDisabled,
                      ]}
                      onPress={() => dispatch(decreaseLevel2Quantity(item.id))}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => dispatch(increaseLevel2Quantity(item.id))}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => dispatch(removeFromLevel2Cart(item.id))}
                  >
                    <Text style={styles.deleteBtnText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng Cộng:</Text>
              <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
            </View>
          </>
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
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#059669',
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
    color: '#064E3B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#047857',
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
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productBtn: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
    marginVertical: 4,
  },
  addChip: {
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 4,
  },
  addChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
    paddingHorizontal: 12,
  },
  cartItemCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  itemInfo: {
    gap: 3,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemQtyBadge: {
    color: '#059669',
    fontWeight: '800',
  },
  itemUnitText: {
    fontSize: 13,
    color: '#64748B',
  },
  itemSubtotal: {
    color: '#0F172A',
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnDisabled: {
    opacity: 0.45,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  qtyValue: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
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
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#059669',
  },
});
