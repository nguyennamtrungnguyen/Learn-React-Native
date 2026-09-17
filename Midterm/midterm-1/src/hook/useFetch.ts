import { useState } from "react";

export const useFetch = (baseUrl: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (url: string, options?: RequestInit) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(baseUrl + url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      if (!res.ok) throw new Error("Lỗi");
      return res.json();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const get = (url: string) => request(url, { method: "GET" });
  const post = (url: string, data: any) =>
    request(url, { method: "POST", body: JSON.stringify(data) });
  const put = (url: string, data: any) =>
    request(url, { method: "PUT", body: JSON.stringify(data) });
  const del = (url: string) => request(url, { method: "DELETE" });

  return { isLoading, error, get, post, put, del };
};
