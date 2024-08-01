import React, { useState } from 'react';

interface SearchIdInputProps {
  searchIdQuery: string;
  setSearchIdQuery: (query: string) => void;
}

const SearchIdInput: React.FC<SearchIdInputProps> = ({
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
    <div className='searchId'>
      <input
        className='searchIdInput'
        type='text'
        placeholder='Type your steam id here'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className='searchIdButton' onClick={handleButtonClick}>
        Show inventory
      </button>
    </div>
  );
};

export default SearchIdInput;
