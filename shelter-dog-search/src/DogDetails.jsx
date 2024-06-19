import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FrameContainer = styled.div`
  border: 5px solid #8B4513;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  background-color: #fbeaa6 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const DogDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const DogCard = styled.div`
  background-color: #f9f9f9 !important;
  border: ${({ $favorited }) => ($favorited ? '3px solid #ffcc00' : '1px solid #ddd')};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const DogDetail = styled.p`
  margin: 8px 0;
`;

const DogImageStyled = styled.img`
  height: 75%;
  width: 75%;
  object-fit: cover;
  border-radius: 8px;
`;

const DogDetails = ({ dogIDs, setFavoriteDogs, favoriteDogs }) => {
  const [dogDetails, setDogDetails] = useState(null);

  useEffect(() => {
    const baseUrl = 'https://frontend-take-home-service.fetch.com';
    const requestConfig = {
      withCredentials: true,
    };
    axios.post(`${baseUrl}/dogs/`, dogIDs, requestConfig)
      .then((response) => {
        setDogDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dogIDs]);

  const toggleFavoriteDog = (id) => {
    if (favoriteDogs.includes(id)) {
      setFavoriteDogs(favoriteDogs.filter((dogId) => dogId !== id));
    } else {
      setFavoriteDogs([...favoriteDogs, id]);
    }
  };

  return (
    <FrameContainer>
      <DogDetailsContainer>
        {dogDetails && dogDetails.map((dog) => (
          <DogCard
            key={dog.id}
            onClick={() => toggleFavoriteDog(dog.id)}
            $favorited={favoriteDogs.includes(dog.id)}
          >
            <DogImageStyled src={dog.img} />
            <DogDetail><strong>Name:</strong> {dog.name}</DogDetail>
            <DogDetail><strong>Age:</strong> {dog.age}</DogDetail>
            <DogDetail><strong>Breed:</strong> {dog.breed}</DogDetail>
            <DogDetail><strong>Zip Code:</strong> {dog.zip_code}</DogDetail>
          </DogCard>
        ))}
      </DogDetailsContainer>
    </FrameContainer>
  );
};

export default DogDetails;
