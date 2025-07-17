import { tasksMock } from '../mocks/tasks';

export const resolvers = {
  Query: {
    tasks: (_: any, { categoria, pegar }: any) => {
      let resultado = tasksMock;
      if (categoria && categoria !== 'Todos') {
        resultado = resultado.filter(task => task.categoria === categoria);
      }
      return resultado.sort((a, b) => b.dtCriacao.localeCompare (a.dtCriacao)).slice(0, pegar || 10);
    },
  },
  Mutation: {
    updateTaskStatus: (_: any, { id, status }: any) => {
      const task = tasksMock.find(t => t.id === id);
      if (task) task.status = status;
      return task;
    },
  },
};
