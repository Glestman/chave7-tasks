// src/components/layout/TaskList.tsx

import { TaskCard } from './TaskCard';

interface Usuario {
  primeiroNome: string;
  sobrenome: string;
}

interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string | null;
  status: string;
  categoria: string;
  dtCriacao: string;
  user: Usuario;
}

interface Props {
  tasks: Tarefa[];
  onStatusChange: (id: string, status: string) => void;
}

export function TaskList({ tasks, onStatusChange }: Props) {
  if (!tasks.length) {
    return <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
