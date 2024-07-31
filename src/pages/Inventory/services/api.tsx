import axios from 'axios';

const API_URL = 'https://www.steamwebapi.com/steam/api/inventory';
const API_KEY = import.meta.env.VITE_STEAMWEB_API_KEY;
const STEAM_ID = '76561198204145631';

export const fetchInventory = async () => {
  try {
    const response = await axios.get(
      `${API_URL}?key=${API_KEY}&steam_id=${STEAM_ID}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    throw error;
  }
};
