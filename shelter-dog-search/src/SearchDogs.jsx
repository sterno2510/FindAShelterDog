import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import DogDetails from './DogDetails';
import MatchedDog from './MatchedDog';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  background-color: #fff8dc !important;
  color: black !important;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const AutocompleteStyled = styled(Autocomplete)`
  margin-right: 10px;
  width: 200px;
  background-color: #fff8dc;
`;

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ResultsContainer = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const NavigationButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;

  button {
    margin-right: 10px;
  }
`;

const SearchDogs = ({ availableBreeds }) => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [dogsData, setDogsData] = useState({ resultIds: [], total: 0, next: null, prev: null });
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [matchedDog, setMatchedDog] = useState(null);
  const [matched, setMatched] = useState(false);
  const baseUrl = 'https://frontend-take-home-service.fetch.com';
  const ageSortOptions = ['< 1 Year', '1-3 years', '4-7 years', '7+ years'];
  const alphaSortOptions = ['Sort alphabetically ascending', 'Sort alphabetically descending'];

  const ageRangeMap = {
    '< 1 Year': { min: 0, max: 1 },
    '1-3 years': { min: 1, max: 3 },
    '4-7 years': { min: 4, max: 7 },
    '7+ years': { min: 7, max: null },
  };

  const alphabeticalMap = {
    'Sort alphabetically ascending': 'asc',
    'Sort alphabetically descending': 'desc',
  };

  const handleSearch = (url = `${baseUrl}/dogs/search`) => {
    axios.get(url, {
      params: {
        breeds: selectedBreed,
        sort: `name:${sortDirection}`,
        ageMin: minAge,
        ageMax: maxAge,
      },
      withCredentials: true
    })
      .then(response => {
        setDogsData({
          resultIds: response.data.resultIds,
          total: response.data.total,
          next: response.data.next,
          prev: response.data.prev
        });
      }).catch(error => {
        console.error('Error fetching dogs data:', error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [minAge, maxAge, sortDirection, selectedBreed]);

  const handleNextPrev = (forward) => {
    const requestConfig = {
      withCredentials: true,
    };
    const url = forward ? `${baseUrl}${dogsData.next}` : `${baseUrl}${dogsData.prev}`

    if (dogsData.next) {
      axios.get(url, requestConfig)
        .then((response) => {
          setDogsData({
            resultIds: response.data.resultIds,
            total: response.data.total,
            next: response.data.next,
            prev: response.data.prev
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const match = () => {
    const requestConfig = {
      withCredentials: true,
    };

    const url = `${baseUrl}/dogs/match`;

    axios.post(url, favoriteDogs, requestConfig)
      .then((response) => {
        console.log('First response:', response.data);

        const secondUrl = `${baseUrl}/dogs/`;
        console.log('matchid', response.data.match);

        return axios.post(secondUrl, [response.data.match], requestConfig);
      })
      .then((secondResponse) => {
        setMatchedDog(secondResponse.data)
        setMatched(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      {!matched ? (
        <>
          <Title>Search Dogs</Title>
          <div style={{paddingBottom: '25px'}}>Directions:  Click and highlight your favorite dogs.  When you finish, click on 'Search For Your Match!' and you will get your recommended dog!</div>
          <ButtonContainer>
            <ButtonStyled variant="contained" onClick={() => { match() }}>
              Search for your Match!
            </ButtonStyled>
          </ButtonContainer>
          <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
            <AutocompleteStyled
              options={availableBreeds}
              onChange={(event, newValue) => setSelectedBreed(newValue)}
              renderInput={(params) => <TextField {...params} label="Filter by Breed" />}
            />
            <AutocompleteStyled
              options={ageSortOptions}
              onChange={(event, newValue) => {
                const ageRange = ageRangeMap[newValue] || { min: null, max: null };
                setMinAge(ageRange.min);
                setMaxAge(ageRange.max);
              }}
              renderInput={(params) => <TextField {...params} label="Filter by Age" />}
            />
            <AutocompleteStyled
              options={alphaSortOptions}
              onChange={(event, newValue) => setSortDirection(alphabeticalMap[newValue])}
              renderInput={(params) => <TextField {...params} label="Sort Alphabetically" />}
            />
          </div>
        </>
      ) : (
        <div>
          <ButtonStyled onClick={() => { setMatched(false) }} type='button'>Go Back To Search</ButtonStyled>
          <MatchedDog matchedDog={matchedDog[0]} />
        </div>
      )}
      <ResultsContainer>Total results: {dogsData.total}</ResultsContainer>
      <NavigationButtons>
        <ButtonStyled variant="contained" onClick={() => { handleNextPrev(false) }} disabled={!dogsData.prev}>
          Previous
        </ButtonStyled>
        <ButtonStyled variant="contained" onClick={() => { handleNextPrev(true) }} disabled={!dogsData.next}>
          Next
        </ButtonStyled>
      </NavigationButtons>
      <DogDetails dogIDs={dogsData.resultIds} setFavoriteDogs={setFavoriteDogs} favoriteDogs={favoriteDogs} />
    </Container>
  );
};

export default SearchDogs;
