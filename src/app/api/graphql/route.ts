// src/app/api/graphql/route.ts
import { NextRequest } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

let allTasks = [
        {
          id: 'task-1',
          titulo: 'Configurar GraphQL API Route',
          descricao: 'Implementar o servidor GraphQL no Next.js.',
          status: 'EM_ANDAMENTO',
          categoria: 'Trabalho',
          dtCriacao: new Date().toISOString(),
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },
        {
          id: 'task-2',
          titulo: 'Comprar café',
          descricao: 'Comprar café para o escritório.',
          status: 'PENDENTE',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 86400000).toISOString(), // Ontem
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },
        {
          id: 'task-3',
          titulo: 'Revisar PR #123',
          descricao: 'Verificar o pull request do colega.',
          status: 'CONCLUIDO',
          categoria: 'Trabalho',
          dtCriacao: new Date(Date.now() - 2 * 86400000).toISOString(), // Dois dias atrás
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },
        {
          id: 'task-4',
          titulo: 'Compras',
          descricao: 'Compra leite no supermercado.',
          status: 'CONCLUIDO',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 2 * 86400000).toISOString(), // Dois dias atrás
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },
        {
          id: 'task-5',
          titulo: 'Limpeza',
          descricao: 'Ao chegar em casa fazer uma limpeza geral.',
          status: 'PENDENTE',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 5 * 86400000).toISOString(), // Cinco dias atrás
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        }, {
          id: 'task-6',
          titulo: 'Comida',
          descricao: 'Pedi lanche no Ifood.',
          status: 'CONCLUIDO',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 4 * 86400000).toISOString(), // Quatro dias atrás
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },
        {
          id: 'task-7',
          titulo: 'Lazer',
          descricao: 'Sair para passear com cachorro.',
          status: 'CONCLUIDO',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 4 * 86400000).toISOString(), // Quatro dias atrás
          user: { primeiroNome: 'João', sobrenome: 'Kleber' },
        },
        {
          id: 'task-8',
          titulo: 'Lazer com Esposa',
          descricao: 'Levar esposa para comemorar aniversário.',
          status: 'CONCLUIDO',
          categoria: 'Pessoal',
          dtCriacao: new Date(Date.now() - 10 * 86400000).toISOString(), // Dez dias atrás
          user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
        },

      ];
// Define o schema GraphQL
const typeDefs = gql`
  type User {
    primeiroNome: String
    sobrenome: String
  }

  type Task {
    id: ID!
    titulo: String!
    descricao: String
    status: String!
    categoria: String!
    dtCriacao: String!
    user: User!
  }

  type Query {
    tasks(categoria: String, pegar: Int): [Task!]!
  }

  type Mutation {
    updateTaskStatus(id: String!, status: String!): Task!
    createTask(titulo: String!, descricao: String, categoria: String!): Task!
  }
`;



// Resolvers
const resolvers = {
  Query: {
    tasks: (_: any, { categoria, pegar }: { categoria?: string, pegar?: number }) => {
      
      let filteredTasks = allTasks;
      if (categoria && categoria !== 'Todos') {
        filteredTasks = allTasks.filter(task => task.categoria.toLowerCase() === categoria.toLowerCase());
      }

      // Simula o "pegar" (take)
      if (pegar) {
        filteredTasks = filteredTasks.slice(0, pegar);
      }

      return filteredTasks;
    },
  },
  Mutation: {
    updateTaskStatus: (_: any, { id, status }: any) => {
      const task = allTasks.find((t) => t.id === id);
      if (task) task.status = status;
      return task;
    },
    createTask: (_: any, { titulo, descricao, categoria }: any) => {
      const novaTarefa = {
        id: Date.now().toString(36),
        titulo,
        descricao: descricao || '',
        status: 'PENDENTE',
        categoria,
        dtCriacao: new Date().toISOString(),
        user: { primeiroNome: 'Glestman', sobrenome: 'Dev' },
      };
      allTasks.push(novaTarefa);
      return novaTarefa;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}



