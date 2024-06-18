import {React, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelStyled = styled.label`
  margin-bottom: 15px;
`;

const InputStyled = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Login = ({ authenticated, setAuthenticated, setAvailableBreeds}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const baseUrl = 'https://frontend-take-home-service.fetch.com';
    const requestConfig = {
      withCredentials: true,
    };
    const params = {name: userName, email: userEmail}

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
            console.log(`There was an error ${error}`)
          })
          console.log('Login successful');
        } else {
          // I want to handle failure better
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
  };

  return (
     <ContainerStyled>
      <h2>Login</h2>
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
  )
};

export default Login;
