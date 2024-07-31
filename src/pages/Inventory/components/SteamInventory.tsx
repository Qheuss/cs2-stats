// src/components/Inventory.tsx
import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';

interface InventoryItem {
  id: number;
  marketname: string;
  pricereal: number;
  image: string;
}

const SteamInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInventory = async () => {
      try {
        const data = await fetchInventory();
        setInventory(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch inventory');
        setLoading(false);
      }
    };

    getInventory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className='InventoryDisplay'>
      {inventory.map((item) => (
        <li className='inventoryItemCard' key={crypto.randomUUID()}>
          <div className='inventoryBackground'></div>
          <div className='inventoryItemImage'>
            <img src={item.image} alt={item.marketname} />
          </div>
          <div className='inventoryItemInfos'>
            <div>{item.marketname}</div>
            <div>{item.pricereal} $</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SteamInventory;
