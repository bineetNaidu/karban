import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Card {
    _id: ID!
    category: String!
    body: String
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

  input CardInput {
    category: String
    body: String
  }

  type Mutation {
    # Projects
    login(username: String!, password: String!): User
    logout: Boolean
    register(username: String!, password: String!, avatar: String): User
    createProject(projectName: String!, projectDescription: String!): Project
    updateProject(id: ID!, data: ProjectUpdateDataInput): Project
    deleteProject(id: ID!): Boolean
    createCard(projectId: ID!, input: CardInput): Card
    updateCard(projectId: ID!, cardId: ID!, input: CardInput): Card
    deleteCard(projectId: ID!, cardId: ID!): Boolean
  }
`;
