import { gql } from '@apollo/client';

export const AUTHENTICATED_USER = gql`
  query {
    authenticatedUser {
      _id
      username
      avatar
      githubId
      projects {
        _id
        projectName
        projectDescription
        tabs {
          _id
        }
      }
    }
  }
`;
