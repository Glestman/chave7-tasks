'use client';

import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/layout/Container';
import { TaskList } from '../components/layout/TaskList';
import { TaskForm } from '../components/layout/TaskForm';
import { TaskCard } from '../components/layout/TaskCard';

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


const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      titulo
      descricao
      categoria
      status
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
    }
  }`;

export default function HomePage() {
  const [categoria, setCategoria] = useState('Todos');
  const { data, refetch } = useQuery(GET_TASKS, { variables: { categoria, pegar: 10 } });
  const [updateStatus] = useMutation(UPDATE_TASK, { onCompleted: () => refetch() });
  const [createTask] = useMutation(CREATE_TASK, { onCompleted: () => refetch() });

  return (
    <>
      <Header />
      <Container>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Filtrar por categoria</label>
          <select
            className="mb-4 p-2 border rounded"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {['Todos', 'Trabalho', 'Pessoal', 'Estudos'].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <TaskForm
          onSave={(tarefa) =>
            createTask({
              variables: {
                input: {
                  titulo: tarefa.titulo,
                  descricao: tarefa.descricao,
                  categoria: tarefa.categoria,
                  status: 'PENDENTE',
                  userPrimeiroNome: 'Ramon',
                  userSobrenome: 'Glestman',
                },
              },
            })
          }
        />

        <TaskList
          tasks={data?.tasks || []}
          onStatusChange={(id, status) =>
            updateStatus({ variables: { id, status } })
          }
        />
      </Container>
      <Footer />
    </>
  );
}
