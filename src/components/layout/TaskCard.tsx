'use client';

import { useState } from 'react';

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
  task: Tarefa;
  onStatusChange: (id: string, status: string) => void;
}

export function TaskCard({ task, onStatusChange }: Props) {
  const [statusSelecionado, setStatusSelecionado] = useState(task.status);

  const handleStatusChange = (novoStatus: string) => {
    setStatusSelecionado(novoStatus);
    onStatusChange(task.id, novoStatus);
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-bold">{task.titulo}</h2>
      {task.descricao && <p className="text-sm text-gray-700 mb-2">{task.descricao}</p>}
      <p className="text-xs text-gray-500 mb-1">
        Categoria: <strong>{task.categoria}</strong>
      </p>
      <p className="text-xs text-gray-500 mb-1">
        Criada em: <strong>{new Date(task.dtCriacao).toLocaleString('pt-BR')}</strong>
      </p>
      <p className="text-xs text-gray-500 mb-2">
        Responsável: <strong>{task.user.primeiroNome} {task.user.sobrenome}</strong>
      </p>
      <select
        className="p-2 border rounded bg-gray-100"
        value={statusSelecionado}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="pending">Pendente</option>
        <option value="in_progress">Em andamento</option>
        <option value="completed">Concluída</option>
      </select>
    </div>
  );
}
