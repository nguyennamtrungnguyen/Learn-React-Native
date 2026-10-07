import axios from "axios";
import { useState } from "react";

export const useFetch = (baseURL: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const get = async (url: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(baseURL + url);
      return res.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { get, isLoading, error };
};
