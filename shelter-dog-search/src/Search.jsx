import {React, useState} from 'react';
import Login from './Login';
import SearchDogs from './SearchDogs'

const Search = () =>{
  const [authenticated, setAuthenticated] = useState(false);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  console.log('auth', authenticated)

  return (
    <>
    {!authenticated && <Login authenticated={authenticated} setAuthenticated={setAuthenticated} setAvailableBreeds={setAvailableBreeds}/>}
    {authenticated && <SearchDogs availableBreeds={availableBreeds}/>}
  </>
  )
}

export default Search;