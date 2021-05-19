import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Card {
    cardId: String!
    cardBody: String
  }

  type Tab {
    _id: ID
    tabName: String!
    cards: [Card]
  }

  type Project {
    _id: ID
    projectName: String!
    projectDescription: String!
    tabs: [Tab]
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
    allProjects: [Project]
    allUsers: [User]
    getProjectById(id: ID!): Project
    getTabById(id: ID!): Tab
  }

  input UpdateDataInput {
    projectName: String
    projectDescription: String
  }

  type Mutation {
    createProject(projectName: String!, projectDescription: String!): Project
    updateProject(id: ID!, data: UpdateDataInput): Project
    deleteProject(id: ID!): Boolean
  }
`;
