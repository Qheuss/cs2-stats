import { useState, useEffect } from 'react';
import axios from 'axios';

interface ExchangeRateResponse {
  conversion_rates: {
    EUR: number;
  };
}

const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get<ExchangeRateResponse>(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGERATE_API_KEY
          }/latest/USD`
        );
        const rate = response.data.conversion_rates.EUR;
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);
  return exchangeRate;
};

export default useExchangeRate;
