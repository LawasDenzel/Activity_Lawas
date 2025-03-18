const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GraphQL schema
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): Post
    updatePost(id: ID!, title: String, content: String, author: String): Post
    deletePost(id: ID!): Post
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getPosts: () => prisma.post.findMany(),
    getPost: (_, args) => prisma.post.findUnique({ where: { id: Number(args.id) } })
  },
  Mutation: {
    createPost: (_, args) => prisma.post.create({ data: args }),
    updatePost: (_, args) =>
      prisma.post.update({ where: { id: Number(args.id) }, data: args }),
    deletePost: (_, args) => prisma.post.delete({ where: { id: Number(args.id) } })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Posts service running at ${url}`);
});
