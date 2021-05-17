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
    email: String!
    projects: [Project]
  }

  type Query {
    allProjects: [Project]
    allUsers: [Project]
    getProjectById(id: ID!): Project
    getTabById(id: ID!): Tab
  }

  type Mutation {
    signUp(
      username: String!
      avatar: String
      email: String!
      password: String!
    ): User!
    login(username: String!, password: String!): User
    createProject(projectName: String!, projectDescription: String!): Project
    createTab(projectId: ID!, tabName: String!): Tab
    createCard(projectId: ID!, cardId: ID!, cardBody: String!): Card
  }
`;
