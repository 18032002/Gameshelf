// graphql/typeDefs.js
// Definición del esquema GraphQL (tipos, queries y mutations)
const gql = require('graphql-tag');

const typeDefs = gql`
  type Game {
    id: ID!
    name: String!
    slug: String!
    imageUrl: String!
    notes: [Note!]!
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    isPublic: Boolean!
    usefulVotes: Int!
    uselessVotes: Int!
    game: Game!
    author: String!
    createdAt: String!
  }

  type Query {
    games: [Game!]!
    game(slug: String!): Game
    notes(gameId: ID, isPublic: Boolean): [Note!]!
    note(id: ID!): Note
  }

  type Mutation {
    createNote(
      gameId: ID!
      title: String!
      content: String!
      isPublic: Boolean!
      author: String
    ): Note!
    voteNote(id: ID!, vote: String!): Note!   # vote = "useful" o "useless"
  }
`;

module.exports = typeDefs;
