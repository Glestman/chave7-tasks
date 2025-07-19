import { tasksMock } from '../../../mocks/tasks';
function gerarIdSimples() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

export const resolvers = {
  Query: {
    tasks: (_: any, { categoria, pegar }: any) => {
      let resultado = tasksMock;
      if (categoria && categoria !== 'Todos') {
        resultado = resultado.filter(task => task.categoria === categoria);
      }
      return resultado
        .sort((a, b) => b.dtCriacao.localeCompare(a.dtCriacao))
        .slice(0, pegar || 10);
    },
  },
  Mutation: {
    updateTaskStatus: (_: any, { id, status }: any) => {
      const task = tasksMock.find(t => t.id === id);
      if (task) task.status = status;
      return task;
    },

    createTask: (_: any, { input }: any) => {
      const novaTarefa = {
        id: gerarIdSimples(),
        titulo: input.titulo,
        descricao: input.descricao || '',
        status: input.status,
        categoria: input.categoria,
        dtCriacao: new Date().toISOString(),
        user: {
          primeiroNome: input.userPrimeiroNome,
          sobrenome: input.userSobrenome,
        },
      };

      tasksMock.push(novaTarefa);

      return novaTarefa;
    },
  },
};