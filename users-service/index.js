const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");      // Import schema
const resolvers = require("./resolvers");  // Import resolvers

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server on port 4001
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Users service running at ${url}`);
});
