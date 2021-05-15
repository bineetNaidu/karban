import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation ($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      _id
      username
      email
      avatar
    }
  }
`;
