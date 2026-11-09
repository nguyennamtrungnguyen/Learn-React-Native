import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from './store/cartSlice';
import { RootState } from './store';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard Mechanical', price: 120 },
  { id: 4, name: 'Monitor LG 27"', price: 350 },
  { id: 5, name: 'USB Cable', price: 15 },
];

export default function CartScreen() {
  const dispatch = useDispatch();

  // Lấy danh sách sản phẩm từ store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Hàm thêm sản phẩm (chọn ngẫu nhiên từ PRODUCTS)
  const handleAddProduct = () => {
    const randomProduct =
      PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  // Hàm xóa sản phẩm
  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Hàm cập nhật số lượng
  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // Tính tổng tiền
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ Hàng</Text>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
            <Text style={styles.emptySubText}>
              Nhấn "+ Thêm Sản Phẩm" bên dưới để bắt đầu
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>

            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Số lượng: {item.quantity}</Text>
              <View style={styles.quantityButtons}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Nút xóa */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemoveProduct(item.id)}
            >
              <Text style={styles.removeBtnText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 2 nút chính: Thêm sản phẩm, Xóa giỏ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>+ Thêm Sản Phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.buttonText}>🗑️ Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>

      {/* Tính tổng tiền */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng: ${totalAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563eb',
  },
  quantitySection: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityLabel: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 6,
  },
  quantityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  removeBtn: {
    backgroundColor: '#fee2e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  removeBtnText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalBox: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  totalText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

