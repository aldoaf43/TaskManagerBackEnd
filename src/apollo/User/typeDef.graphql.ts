import { gql } from 'graphql-tag';

export default gql`
  type User implements Node @cacheControl(maxAge: 60, scope: PRIVATE) {
    _id: ID!
    name: String!
    lastName: String!
    email: String!
    password: String!
    profileImage: String!
    phone: String!
    createdAt: Date! @cacheControl(maxAge: 3600, scope: PRIVATE)
    updatedAt: Date!
  }

  input RegisterUserInput {
    name: String!
    lastName: String
    email: String!
    password: String!
    profileImage: String
    phone: String
  }

  input UpdateUserInput {
    name: String
    lastName: String!
    email: String
    password: String
    profileImage: String
    phone: String
  }

  input LoginInput {
    email: String
    password: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    user(input: RegisterUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
  }
`;
