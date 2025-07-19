// src/components/layout/TaskForm.tsx

'use client';

import { useState } from 'react';

interface Task {
  id?: string;
  titulo: string;
  descricao?: string;
  categoria: string;
}

interface Props {
  initial?: Task;
  onSave: (task: Task) => void;
}

export function TaskForm({ initial, onSave }: Props) {
  const [titulo, setTitulo] = useState(initial?.titulo || '');
  const [descricao, setDescricao] = useState(initial?.descricao || '');
  const [categoria, setCategoria] = useState(initial?.categoria || 'Trabalho');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: initial?.id, titulo, descricao, categoria });
    setTitulo('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block font-medium">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Categoria</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {['Trabalho', 'Pessoal', 'Estudos'].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {initial ? 'Atualizar Tarefa' : 'Criar Tarefa'}
      </button>
    </form>
  );
}
