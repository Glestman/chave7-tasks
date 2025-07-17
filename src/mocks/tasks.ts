export const tasksMock = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i}`,
  titulo: `Tarefa ${i + 1}`,
  descricao: i % 2 === 0 ? `Descrição da tarefa ${i + 1}` : null,
  status: i % 3 === 0 ? 'completed' : 'pending',
  categoria: ['Trabalho', 'Pessoal', 'Estudos'][i % 3],
  dtCriacao: new Date(Date.now() - i * 1000000).toISOString(),
  user: {
    primeiroNome: `Nome${i}`,
    sobrenome: `Sobrenome${i}`,
  },
}));
