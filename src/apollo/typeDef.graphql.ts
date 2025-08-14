import { gql } from 'graphql-tag';

export default gql`
  scalar Date

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Query @rateLimit(limit: 15, duration: 1) {
    _empty: String
  }

  type Mutation @rateLimit(limit: 15, duration: 1) {
    _empty: String
  }

  interface Node {
    _id: ID!
    createdAt: Date
    updatedAt: Date
  }

  input StringOperators {
    eq: String
    ne: String
    in: [String]
    nin: [String]
    search: String
  }
`;
