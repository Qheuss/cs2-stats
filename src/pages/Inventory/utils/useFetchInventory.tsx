import { useState, useEffect } from 'react';

interface InventoryItem {
  // Define the structure of an inventory item based on the API response
}

interface FetchResult {
  data: InventoryItem[] | null;
  loading: boolean;
  error: string | null;
}

const useFetchInventory = (url: string): FetchResult => {
  const [data, setData] = useState<InventoryItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); // Adjust based on actual API response
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchInventory;
