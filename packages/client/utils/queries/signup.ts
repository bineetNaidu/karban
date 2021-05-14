import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation (
    $avatar: String
    $email: String!
    $password: String!
    $username: String!
  ) {
    signUp(
      avatar: $avatar
      email: $email
      password: $password
      username: $username
    ) {
      token
      _id
      username
      email
      avatar
    }
  }
`;
