import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const useFetch = (baseUrl: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (url: string, options?: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        baseUrl: baseUrl,
        url: url,
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });
      return response.data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra khi lấy dữ liệu",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const get = (url: string) => {
    return request(url, {
      method: "GET",
    });
  };

  return { isLoading, error, get };
};
