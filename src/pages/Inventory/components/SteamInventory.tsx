import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../utils/api';
import SearchInput from './SearchInput';
import useExchangeRate from '../utils/useExchangeRate';
import SearchIdInput from './SearchIdInput';
import { FaArrowsRotate } from 'react-icons/fa6';
import SidePanelInventory from './SidePanelInventory';

interface InventoryItem {
  id: number;
  marketname: string;
  pricelatest: number;
  image: string;
  tags: Tag[];
}

interface Tag {
  localized_tag_name: string;
}

const SteamInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchIdQuery, setSearchIdQuery] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
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

  const handleSortByQuality = () => {
    const sortedInventory = [...inventory].sort((a, b) => {
      const qualityA = a.tags[0].localized_tag_name.toLowerCase();
      const qualityB = b.tags[0].localized_tag_name.toLowerCase();

      if (qualityA < qualityB) return isAscending ? -1 : 1;
      if (qualityA > qualityB) return isAscending ? 1 : -1;
      return 0;
    });
    setInventory(sortedInventory);
    setIsAscending(!isAscending);
  };

  if (STEAM_ID.length > 0) {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontSize: '2rem',
          }}
        >
          Loading...
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            gap: '1rem',
            fontSize: '2rem',
          }}
        >
          {error}
          <a
            style={{
              color: 'white',
              fontStyle: 'underline',
              backgroundColor: 'black',
              padding: '0.7rem',
              borderRadius: '0.5rem',
            }}
            onClick={resetId}
          >
            Retry
          </a>
        </div>
      );
    }

    return (
      <div className='inventoryList'>
        <SidePanelInventory
          onSortByQuality={handleSortByQuality}
          isAscending={isAscending}
        />
        <div className='InventoryContent'>
          <h1>Inventory</h1>
          <div className='InventoryInfos'>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div className='totalAndReset'>
              <a onClick={resetId}>
                <FaArrowsRotate />
              </a>

              <span>
                Total: {TotalPriceCalc()}
                {exchangeRate !== null ? ' €' : ' $'}
              </span>
            </div>
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
                      ? (item.pricelatest * exchangeRate).toFixed(2) + ' €'
                      : item.pricelatest + ' $'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className='inventorySearchId'>
        <SearchIdInput
          searchIdQuery={searchIdQuery}
          setSearchIdQuery={setSearchIdQuery}
        />
        <div className='whereIsSteamId'>
          <h3>To find your Steam ID:</h3>
          <ul>
            <li>
              In the Steam desktop application, select your Steam username in
              the top right corner of the screen.
            </li>
            <li>Select "Account details".</li>
            <li>Your Steam ID can be found below your Steam username.</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default SteamInventory;

// import React, { useEffect, useState } from 'react';
// import { fetchInventory } from '../utils/api';
// import SearchInput from './SearchInput';
// import useExchangeRate from '../utils/useExchangeRate';
// import SearchIdInput from './SearchIdInput';
// import { FaArrowsRotate } from 'react-icons/fa6';
// import SidePanelInventory from './SidePanelInventory';

// interface InventoryItem {
//   id: number;
//   marketname: string;
//   pricelatest: number;
//   image: string;
//   tags: Tag[];
// }

// interface Tag {
//   localized_tag_name: string;
// }

// const SteamInventory: React.FC = () => {
//   const [inventory, setInventory] = useState<InventoryItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [searchIdQuery, setSearchIdQuery] = useState<string>('');
//   const [isAscending, setIsAscending] = useState<boolean>(true);
//   let exchangeRate = useExchangeRate();

//   const STEAM_ID = searchIdQuery;

//   const qualityOrder = [
//     'Factory New',
//     'Minimal Wear',
//     'Field Tested',
//     'Well Worn',
//     'Battle Scarred',
//   ];

//   useEffect(() => {
//     const getInventory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchInventory(STEAM_ID);
//         setInventory(data);
//       } catch (err) {
//         setError('Failed to fetch inventory');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (STEAM_ID) {
//       getInventory();
//     }
//   }, [STEAM_ID]);

//   const filteredInventory = inventory.filter((item) =>
//     item.marketname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   function TotalPriceCalc() {
//     let price = 0;
//     for (let i = 0; i < filteredInventory.length; i++) {
//       price += filteredInventory[i].pricelatest;
//     }
//     if (exchangeRate === null) {
//       exchangeRate = 1;
//     }
//     return (Number(price) * exchangeRate).toFixed(2);
//   }

//   function resetId() {
//     return setSearchIdQuery('');
//   }

//   const handleSortByQuality = () => {
//     const sortedInventory = [...inventory].sort((a, b) => {
//       const qualityA = a.tags[0].localized_tag_name;
//       const qualityB = b.tags[0].localized_tag_name;

//       const indexA = qualityOrder.indexOf(qualityA);
//       const indexB = qualityOrder.indexOf(qualityB);

//       if (indexA === -1 && indexB === -1) {
//         // Both qualities are not in the qualityOrder array, sort alphabetically
//         return qualityA.localeCompare(qualityB) * (isAscending ? 1 : -1);
//       } else if (indexA === -1) {
//         // Only qualityA is not in the qualityOrder array
//         return 1;
//       } else if (indexB === -1) {
//         // Only qualityB is not in the qualityOrder array
//         return -1;
//       } else {
//         // Both qualities are in the qualityOrder array, sort by custom order
//         return (indexA - indexB) * (isAscending ? 1 : -1);
//       }
//     });
//     setInventory(sortedInventory);
//     setIsAscending(!isAscending);
//   };

//   if (STEAM_ID.length > 0) {
//     if (loading) {
//       return (
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//             fontSize: '2rem',
//           }}
//         >
//           Loading...
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//             gap: '1rem',
//             fontSize: '2rem',
//           }}
//         >
//           {error}
//           <a
//             style={{
//               color: 'white',
//               fontStyle: 'underline',
//               backgroundColor: 'black',
//               padding: '0.7rem',
//               borderRadius: '0.5rem',
//             }}
//             onClick={resetId}
//           >
//             Retry
//           </a>
//         </div>
//       );
//     }

//     return (
//       <div className='inventoryList'>
//         <SidePanelInventory
//           onSortByQuality={handleSortByQuality}
//           isAscending={isAscending}
//         />
//         <div className='InventoryContent'>
//           <h1>Inventory</h1>
//           <div className='InventoryInfos'>
//             <SearchInput
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//             />
//             <div className='totalAndReset'>
//               <a onClick={resetId}>
//                 <FaArrowsRotate />
//               </a>

//               <span>
//                 Total: {TotalPriceCalc()}
//                 {exchangeRate !== null ? ' €' : ' $'}
//               </span>
//             </div>
//           </div>
//           <ul className='inventoryDisplay'>
//             {filteredInventory.map((item) => (
//               <li className='inventoryItemCard' key={crypto.randomUUID()}>
//                 <div className='inventoryBackground'></div>
//                 <div className='inventoryItemImage'>
//                   <img src={item.image} alt={item.marketname} />
//                 </div>
//                 <div className='inventoryItemInfos'>
//                   <div>{item.marketname}</div>
//                   <div>
//                     {exchangeRate !== null
//                       ? (item.pricelatest * exchangeRate).toFixed(2) + ' €'
//                       : item.pricelatest + ' $'}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className='inventorySearchId'>
//         <SearchIdInput
//           searchIdQuery={searchIdQuery}
//           setSearchIdQuery={setSearchIdQuery}
//         />
//         <div className='whereIsSteamId'>
//           <h3>To find your Steam ID:</h3>
//           <ul>
//             <li>
//               In the Steam desktop application, select your Steam username in
//               the top right corner of the screen.
//             </li>
//             <li>Select "Account details".</li>
//             <li>Your Steam ID can be found below your Steam username.</li>
//           </ul>
//         </div>
//       </div>
//     );
//   }
// };

// export default SteamInventory;
