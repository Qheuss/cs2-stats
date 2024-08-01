import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../utils/api';
import SearchInput from './SearchInput';
import useExchangeRate from '../utils/useExchangeRate';
import SearchIdInput from './SearchIdInput';
import { FaArrowsRotate } from 'react-icons/fa6';

interface InventoryItem {
  id: number;
  marketname: string;
  pricelatest: number;
  image: string;
}

const SteamInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchIdQuery, setSearchIdQuery] = useState<string>('');
  let exchangeRate = useExchangeRate();

  const STEAM_ID = searchIdQuery;

  useEffect(() => {
    const getInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInventory(STEAM_ID);
        setInventory(data);
        // setLoading(false);
      } catch (err) {
        setError('Failed to fetch inventory');
        // setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (STEAM_ID) {
      getInventory();
    }
  }, [STEAM_ID]);

  const filteredInventory = inventory.filter((item) =>
    item.marketname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function TotalPriceCalc() {
    let price = 0;
    for (let i = 0; i < filteredInventory.length; i++) {
      price += filteredInventory[i].pricelatest;
    }
    if (exchangeRate === null) {
      exchangeRate = 1;
    }
    return (Number(price) * exchangeRate).toFixed(2);
  }

  function resetId() {
    return setSearchIdQuery('');
  }

  if (STEAM_ID.length > 0) {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <div>
          {error} <a onClick={resetId}>retry</a>
        </div>
      );
    }

    return (
      <>
        <div className='InventoryInfos'>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div>
            <p>test</p>
            <a onClick={resetId}>
              <FaArrowsRotate />
            </a>
          </div>
          {/* <span>Total:{TotalPriceCalc()}</span> */}
          <span>Total: {TotalPriceCalc()} €</span>
        </div>
        <ul className='inventoryDisplay'>
          {filteredInventory.map((item) => (
            <li className='inventoryItemCard' key={crypto.randomUUID()}>
              <div className='inventoryBackground'></div>
              <div className='inventoryItemImage'>
                <img src={item.image} alt={item.marketname} />
              </div>
              <div className='inventoryItemInfos'>
                <div>{item.marketname}</div>
                <div>
                  {exchangeRate !== null
                    ? (item.pricelatest * exchangeRate).toFixed(2)
                    : item.pricelatest}
                  €
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <SearchIdInput
        searchIdQuery={searchIdQuery}
        setSearchIdQuery={setSearchIdQuery}
      />
    );
  }
};

export default SteamInventory;
