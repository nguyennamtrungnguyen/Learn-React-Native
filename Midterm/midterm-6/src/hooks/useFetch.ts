import axios from "axios";
import { useState } from "react";

export const useFetch = (baseURL: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (url: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(baseURL + url);
      return res.data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { get, isLoading, error };
};
