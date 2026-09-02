export type Product = {
  id: number;
  name: string;
  price: number;
};

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}