import React from 'react';
import styled from 'styled-components';

const DogDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 16px;
`;

const DogCard = styled.div`
  background-color: #f9f9f9;
  border: ${({ $favorited }) => ($favorited ? '3px solid #ffcc00' : '1px solid #ddd')};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 90%;
  max-width: 800px;
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

const MatchedDog = ({ matchedDog }) => {
  return (
    <>
      <h1>Here is your Match!</h1>
      <DogDetailsContainer>
        <DogCard $favorited={matchedDog.favorited}>
          <DogImageStyled src={matchedDog.img} />
          <DogDetail><strong>Name:</strong> {matchedDog.name}</DogDetail>
          <DogDetail><strong>Age:</strong> {matchedDog.age}</DogDetail>
          <DogDetail><strong>Breed:</strong> {matchedDog.breed}</DogDetail>
          <DogDetail><strong>Zip Code:</strong> {matchedDog.zip_code}</DogDetail>
        </DogCard>
      </DogDetailsContainer>
    </>
  )
};

export default MatchedDog;
