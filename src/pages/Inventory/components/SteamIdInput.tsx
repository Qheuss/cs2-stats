import React, { useState } from 'react';

interface SteamIdInputProps {
  searchIdQuery: string;
  setSearchIdQuery: (query: string) => void;
}

const SteamIdInput: React.FC<SteamIdInputProps> = ({
  searchIdQuery,
  setSearchIdQuery,
}) => {
  const [inputValue, setInputValue] = useState(searchIdQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setSearchIdQuery(inputValue);
  };
  return (
    <>
      <input
        id='searchSteamId'
        className='searchItems'
        type='text'
        placeholder='Type here you steam id'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Search</button>
    </>
  );
};

export default SteamIdInput;
