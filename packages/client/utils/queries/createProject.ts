import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation (
    $token: String!
    $projectName: String!
    $projectDescription: String!
  ) {
    createProject(
      token: $token
      projectName: $projectName
      projectDescription: $projectDescription
    ) {
      _id
      projectName
      projectDescription
      tabs {
        _id
        tabName
      }
    }
  }
`;
