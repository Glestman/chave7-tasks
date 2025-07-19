import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const handler = apolloServer.createHandler({ path: '/api/graphql' });
