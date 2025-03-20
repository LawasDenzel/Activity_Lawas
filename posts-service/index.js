const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");      // Import schema
const resolvers = require("./resolvers");  // Import resolvers

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/graphql",  // Subscription endpoint
  },
});

// Start the server on port 4002
server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Posts service running at ${url}`);
});
