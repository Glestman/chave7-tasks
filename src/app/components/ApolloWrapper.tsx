// src/components/ApolloWrapper.tsx (Nome sugerido para o novo arquivo)
'use client'; // <--- 1. Diretiva de Client Component

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import React from 'react'; // 2. Importa React (boa prática, mesmo que implícito para JSX)

// 3. Importa a instância do cliente Apollo que você JÁ DEFINIU
import { apolloClient } from 'lib/apolloClient'; // Ajuste o caminho se necessário

// 4. Define o componente funcional ApolloWrapper
export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    // 5. Renderiza o ApolloProvider, que requer um ambiente de cliente
    <ApolloProvider client={apolloClient}>
      {children} {/* 6. Renderiza os filhos que este wrapper envolve */}
    </ApolloProvider>
  );
}