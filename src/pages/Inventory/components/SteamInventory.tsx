import React, { useState, useEffect } from 'react';

interface PlayerData {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
}

const App: React.FC = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const apiKey = import.meta.env.VITE_STEAM_API_KEY;
        const steamID = '76561198204145631'; // Replace with the actual Steam ID you want to query

        // CORS proxy URL
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // Target API URL
        const targetUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;

        // Fetch data from the CORS proxy
        const response = await fetch(proxyUrl + targetUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        // Check for a successful response
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        // Parse the JSON data
        const data = await response.json();
        // Set player data to state
        setPlayerData(data.response.players[0]);
      } catch (error) {
        // Handle any errors
        setError(`Failed to fetch player data: ${error.message}`);
        console.error('Error fetching player data:', error);
      }
    };

    // Fetch player data on component mount
    fetchPlayerData();
  }, []);

  // Render error if exists
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render loading state
  if (!playerData) {
    return <div>Loading...</div>;
  }

  // Render player data
  return (
    <div>
      <h1>{playerData.personaname}</h1>
      <img src={playerData.avatar} alt={playerData.personaname} />
      <a href={playerData.profileurl} target='_blank' rel='noopener noreferrer'>
        Profile
      </a>
    </div>
  );
};

export default App;
