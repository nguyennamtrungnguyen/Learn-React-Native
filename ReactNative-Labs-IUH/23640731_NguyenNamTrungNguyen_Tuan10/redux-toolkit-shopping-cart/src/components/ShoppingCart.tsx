import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import {
  addToCart,
  applyDiscount,
   CartItem,
  clearCart,
  decreaseQuantity,
  hydrateCart,
  increaseQuantity,
  removeFromCart,
  setShippingCost,
} from '../slices/cartSlice';
import { selectCartSummary } from '../slices/cartSelectors';
import { AppDispatch, RootState } from '../store';
import { storage } from '../utils/storage';

const SHIPPING_OPTIONS = [
  { label: 'Miễn phí ($0)', cost: 0, desc: '5-7 ngày làm việc' },
  { label: 'Tiêu chuẩn ($10)', cost: 10, desc: '2-3 ngày làm việc' },
  { label: 'Nhanh ($25)', cost: 25, desc: 'Giao hỏa tốc 24h' },
];

export default function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const productsStatus = useSelector(
    (state: RootState) => state.products.status
  );
  const productsError = useSelector((state: RootState) => state.products.error);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const discountCode = useSelector(
    (state: RootState) => state.cart.discountCode
  );
  const shippingCost = useSelector(
    (state: RootState) => state.cart.shippingCost
  );
  const summary = useSelector(selectCartSummary);

  // Khôi phục giỏ hàng từ AsyncStorage khi mở ứng dụng
  useEffect(() => {
    let mounted = true;
    storage.getItemAsync<CartItem[]>([]).then((savedItems) => {
      if (mounted && savedItems.length > 0) {
        dispatch(hydrateCart(savedItems));
      }
    });
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // Tự động gọi AsyncThunk lấy danh sách sản phẩm
  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const handleApplyDiscount = (code: string) => {
    if (discountCode === code) {
      dispatch(applyDiscount(null));
    } else {
      dispatch(applyDiscount(code));
    }
  };

  const handleShippingChange = (cost: number) => {
    dispatch(setShippingCost(cost));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      if (Platform.OS === 'web') {
        window.alert('Giỏ hàng đang trống!');
      } else {
        Alert.alert('Thông báo', 'Giỏ hàng của bạn đang trống!');
      }
      return;
    }

    const msg = `Đặt hàng thành công!\n• Số lượng: ${summary.itemCount} sản phẩm\n• Thành tiền: $${summary.total.toFixed(2)}`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('🎉 Thanh Toán Thành Công', msg);
    }
    dispatch(clearCart());
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LEVEL 3 • CHUYÊN NGHIỆP</Text>
          </View>
          <View style={styles.persistBadge}>
            <Text style={styles.persistBadgeText}>💾 Persistent Storage</Text>
          </View>
        </View>
        <Text style={styles.title}>🛍️ Cửa Hàng Trực Tuyến</Text>
        <Text style={styles.subtitle}>
          Tích hợp createAsyncThunk (API loading/succeeded/failed), lưu trữ
          bền vững, mã giảm giá, phí vận chuyển, thuế 10% và Selectors nâng cao.
        </Text>
      </View>

      {/* Danh sách sản phẩm từ AsyncThunk */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Sản Phẩm Có Sẵn (AsyncThunk)</Text>
          <View style={styles.thunkActions}>
            <TouchableOpacity
              style={styles.smallActionBtn}
              onPress={() => dispatch(fetchProducts())}
            >
              <Text style={styles.smallActionText}>🔄 Tải lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallActionBtn, styles.smallActionErrorBtn]}
              onPress={() => dispatch(fetchProducts({ shouldFail: true }))}
            >
              <Text style={styles.smallActionErrorText}>⚠️ Thử lỗi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {productsStatus === 'loading' && (
          <View style={styles.statusBox}>
            <ActivityIndicator size="large" color="#D97706" />
            <Text style={styles.statusText}>Đang tải danh sách sản phẩm...</Text>
          </View>
        )}

        {productsStatus === 'failed' && (
          <View style={[styles.statusBox, styles.errorBox]}>
            <Text style={styles.errorTitle}>❌ Lỗi tải dữ liệu</Text>
            <Text style={styles.errorDesc}>{productsError}</Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => dispatch(fetchProducts())}
            >
              <Text style={styles.retryBtnText}>Thử Lại Ngay</Text>
            </TouchableOpacity>
          </View>
        )}

        {productsStatus === 'succeeded' && (
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Text style={styles.productEmoji}>{product.image}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                      })
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.addBtnText}>Thêm Vào Giỏ</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Giỏ hàng */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Giỏ Hàng ({summary.itemCount} sản phẩm)
          </Text>
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => dispatch(clearCart())}
            >
              <Text style={styles.clearBtnText}>Xóa Tất Cả</Text>
            </TouchableOpacity>
          )}
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
            <Text style={styles.emptySubtext}>
              Thêm sản phẩm từ danh sách bên trên để tính hóa đơn tự động
            </Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItemRow}>
              <View style={styles.cartItemTop}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>

              <View style={styles.cartItemBottom}>
                <Text style={styles.cartItemUnitPrice}>
                  Đơn giá: ${item.price.toFixed(2)}
                </Text>

                <View style={styles.cartControls}>
                  <View style={styles.qtyControlBox}>
                    <TouchableOpacity
                      style={[
                        styles.qtyBtn,
                        item.quantity <= 1 && styles.qtyBtnDisabled,
                      ]}
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Text style={styles.removeBtnText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Áp dụng mã giảm giá */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🎟️ Mã Giảm Giá</Text>
        <View style={styles.discountRow}>
          <TouchableOpacity
            style={[
              styles.discountBtn,
              discountCode === 'SUMMER10' && styles.discountBtnActive,
            ]}
            onPress={() => handleApplyDiscount('SUMMER10')}
          >
            <Text
              style={[
                styles.discountBtnTitle,
                discountCode === 'SUMMER10' && styles.discountBtnTextActive,
              ]}
            >
              SUMMER10 (-10%)
            </Text>
            <Text
              style={[
                styles.discountBtnSub,
                discountCode === 'SUMMER10' && styles.discountBtnTextActive,
              ]}
            >
              {discountCode === 'SUMMER10' ? '✓ Đang áp dụng' : 'Chạm để chọn'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.discountBtn,
              discountCode === 'SPECIAL20' && styles.discountBtnActive,
            ]}
            onPress={() => handleApplyDiscount('SPECIAL20')}
          >
            <Text
              style={[
                styles.discountBtnTitle,
                discountCode === 'SPECIAL20' && styles.discountBtnTextActive,
              ]}
            >
              SPECIAL20 (-20%)
            </Text>
            <Text
              style={[
                styles.discountBtnSub,
                discountCode === 'SPECIAL20' && styles.discountBtnTextActive,
              ]}
            >
              {discountCode === 'SPECIAL20' ? '✓ Đang áp dụng' : 'Chạm để chọn'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lựa chọn vận chuyển */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🚚 Phí Vận Chuyển</Text>
        <View style={styles.shippingList}>
          {SHIPPING_OPTIONS.map((option) => {
            const isSelected = shippingCost === option.cost;
            return (
              <TouchableOpacity
                key={option.cost}
                style={[
                  styles.shippingOption,
                  isSelected && styles.shippingOptionSelected,
                ]}
                onPress={() => handleShippingChange(option.cost)}
                activeOpacity={0.8}
              >
                <View style={styles.radioOuter}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <View style={styles.shippingInfo}>
                  <Text style={styles.shippingLabel}>{option.label}</Text>
                  <Text style={styles.shippingDesc}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Tóm tắt hóa đơn */}
      <View style={[styles.sectionCard, styles.summaryCard]}>
        <Text style={[styles.sectionTitle, styles.summaryTitle]}>
          🧾 Tóm Tắt Đơn Hàng
        </Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng cộng (Subtotal):</Text>
          <Text style={styles.summaryValue}>
            ${summary.subtotal.toFixed(2)}
          </Text>
        </View>

        {summary.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.discountLabel}>
              Giảm giá ({discountCode}):
            </Text>
            <Text style={styles.discountValue}>
              -${summary.discount.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Thuế (10%):</Text>
          <Text style={styles.summaryValue}>${summary.tax.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Vận chuyển:</Text>
          <Text style={styles.summaryValue}>
            ${summary.shipping.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Thành Tiền:</Text>
          <Text style={styles.totalValue}>${summary.total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutBtn,
            cartItems.length === 0 && styles.checkoutBtnDisabled,
          ]}
          onPress={handleCheckout}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutBtnText}>
            Thanh Toán (${summary.total.toFixed(2)})
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 36,
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  persistBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  persistBadgeText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#78350F',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#92400E',
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
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  thunkActions: {
    flexDirection: 'row',
    gap: 6,
  },
  smallActionBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  smallActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  smallActionErrorBtn: {
    backgroundColor: '#FEF2F2',
  },
  smallActionErrorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  statusBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
  },
  errorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#991B1B',
  },
  errorDesc: {
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  productName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    minHeight: 36,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#D97706',
    marginVertical: 6,
  },
  addBtn: {
    width: '100%',
    backgroundColor: '#D97706',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 6,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  cartItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  cartItemTotal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  cartItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemUnitPrice: {
    fontSize: 12.5,
    color: '#64748B',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyControlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnDisabled: {
    opacity: 0.45,
  },
  qtyBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  removeBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeBtnText: {
    color: '#DC2626',
    fontSize: 12.5,
    fontWeight: '700',
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#B91C1C',
    fontSize: 12.5,
    fontWeight: '700',
  },
  discountRow: {
    flexDirection: 'row',
    gap: 10,
  },
  discountBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  discountBtnActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#D97706',
  },
  discountBtnTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  discountBtnSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 3,
  },
  discountBtnTextActive: {
    color: '#B45309',
  },
  shippingList: {
    gap: 8,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  shippingOptionSelected: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D97706',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  shippingDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  summaryTitle: {
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  discountLabel: {
    fontSize: 14,
    color: '#34D399',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#34D399',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FBBF24',
  },
  checkoutBtn: {
    backgroundColor: '#D97706',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutBtnDisabled: {
    opacity: 0.5,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '800',
  },
});
