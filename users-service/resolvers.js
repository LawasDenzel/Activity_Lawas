const prisma = require("./prismaClient");

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      return await prisma.user.create({
        data: { name, email },
      });
    },
  },
};

module.exports = resolvers;
