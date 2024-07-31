// src/components/SteamInventory.tsx
import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';
import SearchInput from './SearchInput';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredInventory = inventory.filter((item) =>
    item.marketname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className='InventoryDisplay'>
        {filteredInventory.map((item) => (
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
    </>
  );
};

export default SteamInventory;
