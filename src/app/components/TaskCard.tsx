type Props = {
  task: any;
  onStatusChange: (id: string, newStatus: string) => void;
};

export function TaskCard({ task, onStatusChange }: Props) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <a href={`https://taskmanager.com/task/${task.id}`} target="_blank" className="text-blue-600 font-semibold">{task.title}</a>
      <p>{task.descricao}</p>
      <p>Categoria: {task.Categoria}</p>
      <p>Status: {task.status}</p>
      <p>Usuário: {task.user.primeiroNome} {task.user.sobrenome}</p>
      <button onClick={() => onStatusChange(task.id, task.status === 'pendente' ? 'completo' : 'pendente')}>
        {task.status === 'pendente' ? 'Concluir' : 'Reabrir'}
      </button>
    </div>
  );
}
