import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'MacBook Pro M3 14"',
    price: 1599,
    image: '💻',
  },
  {
    id: 102,
    name: 'iPhone 16 Pro Max',
    price: 1199,
    image: '📱',
  },
  {
    id: 103,
    name: 'AirPods Pro Gen 2',
    price: 249,
    image: '🎧',
  },
  {
    id: 104,
    name: 'iPad Air M2 11"',
    price: 599,
    image: '📟',
  },
  {
    id: 105,
    name: 'Apple Watch Ultra 2',
    price: 799,
    image: '⌚',
  },
  {
    id: 106,
    name: 'Magic Keyboard Pro',
    price: 179,
    image: '⌨️',
  },
];

// Async Thunk: Lấy dữ liệu sản phẩm từ API
export const fetchProducts = createAsyncThunk<
  Product[],
  { shouldFail?: boolean } | void
>('products/fetchProducts', async (options) => {
  // Giả lập độ trễ mạng để quan sát trạng thái loading
  await new Promise((resolve) => setTimeout(resolve, 650));

  if (options && options.shouldFail) {
    throw new Error('Failed to fetch products (Simulated API Error)');
  }

  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=6');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = (await response.json()) as {
      id: number;
      title: string;
      price: number;
      image: string;
    }[];

    const icons = ['🎒', '👕', '🧥', '👔', '💍', '💎'];
    return data.map((item, idx) => ({
      id: item.id,
      name:
        item.title.length > 26
          ? `${item.title.slice(0, 26)}...`
          : item.title,
      price: Number(item.price),
      image: icons[idx % icons.length] || '📦',
    }));
  } catch {
    // Fallback an toàn khi không có kết nối mạng
    return FALLBACK_PRODUCTS;
  }
});

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default productsSlice.reducer;
