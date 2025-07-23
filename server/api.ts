// server/api.ts

import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import neo4j from 'neo4j-driver';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'test'),
);

const resolvers = {
  Query: {
    actors: async (_: any, { search, skip = 0, limit = 20 }: any) => {
      // Demo: Return empty array, real implementation would query Neo4j
      return [];
    },
    narratives: async (_: any, { search, skip = 0, limit = 20 }: any) => {
      return [];
    },
    actor: async (_: any, { id }: any) => null,
    narrative: async (_: any, { id }: any) => null,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL API ready at ${url}`);
});
