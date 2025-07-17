import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    primeiroNome: String!
    sobrenome: String!
  }

  type Task {
    id: ID!
    titulo: String!
    descricao: String
    status: String!
    categoria: String!
    dtCriacao: String!
    usuario: User!
  }

  type Query {
    tasks(categoria: String, pegar: Int): [Task!]!
  }

  type Mutation {
    updateTaskStatus(id: String!, status: String!): Task
  }
`;
