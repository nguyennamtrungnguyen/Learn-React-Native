import { AxiosError } from "axios";

export interface CustomError {
  message: string;
  status?: number;
}

export const testApiError = async (): Promise<void> => {
  try {
    await axios.get("https://jsonplaceholder.typicode.com/abcxyz");
  } catch (error: unknown) {
    // Kiểm tra xem error có phải AxiosError hay không
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const customError: CustomError = {
        message: axiosError.response
          ? "API trả về lỗi!"
          : "Không thể kết nối đến server!",
        status: axiosError.response?.status,
      };

      throw customError;
    }

    const customError: CustomError = {
      message: "Đã xảy ra lỗi không xác định!",
    };

    throw customError;
  }
};
