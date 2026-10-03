import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const useFetch = (baseURL: String) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (url: string, options?: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        baseURL: baseURL,
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
        error.response?.data?.message || error.message || "Có lỗi xảy ra",
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
  const post = (url: string, data: any) => {
    return request(url, {
      method: "POST",
      data: data,
    });
  };

  const put = (url: string, data: any) => {
    return request(url, {
      method: "PUT",
      data: data,
    });
  };

  const del = (url: string) => {
    return request(url, {
      method: "DELETE",
    });
  };

  return { isLoading, error, get, post, put, del };
};
