import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation ($projectName: String!, $projectDescription: String!) {
    createProject(
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
