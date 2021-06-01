import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Card {
    _id: ID!
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

  input ProjectUpdateDataInput {
    projectName: String
    projectDescription: String
  }

  input TabUpdateDataInput {
    tabName: String
    tabId: String!
  }

  type Mutation {
    # Projects
    createProject(projectName: String!, projectDescription: String!): Project
    updateProject(id: ID!, data: ProjectUpdateDataInput): Project
    deleteProject(id: ID!): Boolean

    # Tabs
    createTab(projectId: ID!, tabName: String!): Tab
    updateTab(projectId: ID!, data: TabUpdateDataInput): Tab
    deleteTab(projectId: ID!, tabId: ID!): Boolean
    createCard(projectId: ID!, tabId: ID!, cardBody: String!): [Card]
    deleteCard(projectId: ID!, tabId: ID!, cardId: ID!): Boolean
  }
`;
