const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getUsers: () => prisma.user.findMany(),
    getUser: (_, args) => prisma.user.findUnique({ where: { id: Number(args.id) } })
  },
  Mutation: {
    createUser: (_, args) => prisma.user.create({ data: args }),
    updateUser: (_, args) =>
      prisma.user.update({ where: { id: Number(args.id) }, data: args }),
    deleteUser: (_, args) => prisma.user.delete({ where: { id: Number(args.id) } })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Users service running at ${url}`);
});
