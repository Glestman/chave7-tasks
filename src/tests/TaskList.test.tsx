import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HomePage from '../app/page';

test('renderiza lista', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(await screen.findByText('Gestão de Tarefas')).toBeInTheDocument();
});
