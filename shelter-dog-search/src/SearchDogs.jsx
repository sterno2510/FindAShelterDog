import React from 'react';

const SearchDogs = ({ availableBreeds }) => {
  return (
    <div>
      <div>Let's search for Dogs</div>
      {availableBreeds.map((breed, index) => (
        <div key={index}>{breed}</div>
      ))}
    </div>
  );
};

export default SearchDogs;
