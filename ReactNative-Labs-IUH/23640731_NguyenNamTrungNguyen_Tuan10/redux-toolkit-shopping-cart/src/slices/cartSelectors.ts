import { RootState } from '../store';

// Subtotal (tổng trước thuế)
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Tính giảm giá
export const selectDiscount = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const discountRates: Record<string, number> = {
    SUMMER10: 0.1,
    SPECIAL20: 0.2,
  };
  const rate = discountRates[state.cart.discountCode || ''] || 0;
  return subtotal * rate;
};

// Tính thuế
export const selectTax = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  return subtotal * state.cart.taxRate;
};

// Tổng tiền cuối cùng
export const selectCartTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  if (subtotal === 0) return 0;
  const discount = selectDiscount(state);
  const tax = selectTax(state);
  return subtotal - discount + tax + state.cart.shippingCost;
};

// Chi tiết hóa đơn
export const selectCartSummary = (state: RootState) => ({
  subtotal: selectSubtotal(state),
  discount: selectDiscount(state),
  tax: selectTax(state),
  shipping: state.cart.items.length > 0 ? state.cart.shippingCost : 0,
  total: selectCartTotal(state),
  itemCount: state.cart.items.reduce(
    (count, item) => count + item.quantity,
    0
  ),
});
