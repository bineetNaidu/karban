import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Card {
    _id: ID!
    category: String!
    cardBody: String
  }

  type Project {
    _id: ID
    projectName: String!
    projectDescription: String!
    cards: [Card]
  }

  type User {
    _id: ID
    username: String!
    avatar: String
    githubId: String!
    projects: [Project]
  }

  type Query {
    authenticatedUser: User
    getProjectById(id: ID!): Project
  }

  input ProjectUpdateDataInput {
    projectName: String
    projectDescription: String
  }

  type Mutation {
    # Projects
    createProject(projectName: String!, projectDescription: String!): Project
    updateProject(id: ID!, data: ProjectUpdateDataInput): Project
    deleteProject(id: ID!): Boolean
  }
`;
