import Image from "next/image";

'use client';

import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { TaskCard } from './components/TaskCard';

const GET_TASKS = gql` 
query Tasks($categoria: String, $pegar: Int) {
    tasks(categoria: $categoria, pegar: $pegar) {
      id
      titulo
      descricao
      status
      categoria
      dtCriacao
      user {
        primeiroNome
        sobrenome
      }
    }
  }
`;
const UPDATE_TASK = gql`
mutation UpdateTaskStatus($id: String!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status

      title
    }
  }
`;

export default function HomePage() {
  const [categoria, setCategory] = useState('Todos');
  const { data, refetch } = useQuery(GET_TASKS, { variables: { categoria, pegar: 10 } });
  const [updateStatus] = useMutation(UPDATE_TASK, { onCompleted: () => refetch() });

  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)}>{/* opções */}</select>
      {data?.tasks?.map(task => (
        <TaskCard key={task.id} task={task} onStatusChange={(id, status) => updateStatus({ variables: { id, status } })} />
      ))}
    </div>
  );
}
