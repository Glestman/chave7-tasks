import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Usuario {
    primeiroNome: String!
    sobrenome: String!
  }

  type Tarefa {
    id: ID!
    titulo: String!
    descricao: String
    status: String!
    categoria: String!
    dtCriacao: String!
    user: Usuario!
  }

  type Query {
    tasks(categoria: String, pegar: Int): [Tarefa!]!
  }

  type Mutation {
    updateTaskStatus(id: String!, status: String!): Tarefa
  }
`;
