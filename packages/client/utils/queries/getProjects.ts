import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query ($token: String!) {
    getProjects(token: $token) {
      _id
      projectName
      projectDescription
    }
  }
`;
