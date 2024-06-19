import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ContainerStyled = styled.div`
  border: 5px solid #8B4513;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  background-color: #fff8dc !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;


const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LabelStyled = styled.label`
  margin-bottom: 15px;
  color: #8B4513;
`;

const InputStyled = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid #8B4513;
  border-radius: 5px;
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #8B4513 !important;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  &:hover {
    background-color: #5e2d14;
  }
`;

const Login = ({ authenticated, setAuthenticated, setAvailableBreeds }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const baseUrl = 'https://frontend-take-home-service.fetch.com';
    const requestConfig = {
      withCredentials: true,
    };
    const params = { name: userName, email: userEmail };

    axios.post(`${baseUrl}/auth/login`, params, requestConfig)
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
          axios.get(`${baseUrl}/dogs/breeds`, {
            withCredentials: true,
          })
            .then((response) => {
              setAvailableBreeds(response.data);
            })
            .catch((error) => {
              console.log(`There was an error ${error}`);
            });
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
  };

  return (
    <ContainerStyled>
      <h1 style={{ color: '#8B4513' }}>Welcome to your Shelter Dog Matcher!</h1>
      <h2 style={{ color: '#8B4513' }}>Login</h2>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Name:
          <InputStyled
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </LabelStyled>
        <LabelStyled>
          Email:
          <InputStyled
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </LabelStyled>
        <ButtonStyled type="submit">Login</ButtonStyled>
      </FormStyled>
    </ContainerStyled>
  );
};

export default Login;
