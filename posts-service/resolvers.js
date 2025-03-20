const { PubSub } = require("apollo-server");
const prisma = require("./prismaClient");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    posts: async () => await prisma.post.findMany(),
  },
  Mutation: {
    createPost: async (_, { title, content, userId }) => {
      const newPost = await prisma.post.create({
        data: { title, content, userId },
      });
      
      pubsub.publish("POST_CREATED", { postCreated: newPost });
      return newPost;
    },
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },
};

module.exports = resolvers;
