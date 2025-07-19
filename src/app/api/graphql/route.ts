// src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'; // Note que este é 'graphql-tag', não '@apollo/client'

// 1. Defina seu Schema GraphQL (Types e Resolvers)
// Este é o mesmo schema que você usaria em um servidor GraphQL separado.
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
  }
`;

// 2. Implemente seus Resolvers (lógica para buscar/manipular dados)
const resolvers = {
  Query: {
    tasks: (parent: any, { categoria, pegar }: { categoria?: string, pegar?: number }) => {
      // **IMPORTANTE**: Aqui você conectaria com seu banco de dados REAL!
      // Por enquanto, vamos usar dados mockados para demonstração.
      const allTasks = [
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
      ];

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
    updateTaskStatus: (parent: any, { id, status }: { id: string, status: string }) => {
      // **IMPORTANTE**: Aqui você atualizaria o status no seu banco de dados REAL!
      // Para demonstração, vamos simular a atualização.
      console.log(`Atualizando status da tarefa ${id} para ${status}`);
      // Em uma aplicação real, você buscaria a tarefa no DB, atualizaria e retornaria.
      return { id, status }; // Retorna a tarefa com o novo status
    },
  },
};

// 3. Crie a instância do Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Crie o handler para a API Route do Next.js
const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }), // Você pode adicionar contexto aqui (autenticação, etc.)
});

export { handler as GET, handler as POST };