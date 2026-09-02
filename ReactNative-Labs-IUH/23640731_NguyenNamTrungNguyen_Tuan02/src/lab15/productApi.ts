import axios from "axios";
import { ApiResponse, Product } from "./api";

export const getProducts = async (): Promise<ApiResponse<Product>> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const products: Product[] = response.data.slice(0, 10).map((item: any) => ({
    id: item.id,
    name: `Sản phẩm ${item.id}`,
    price: item.id * 100000,
  }));

  return {
    data: products,
    total: products.length,
    page: 1,
  };
};
