
'use client'; // <--- 1. Diretiva de Client Component

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import React from 'react';


import { apolloClient } from '@/lib/apolloClient';

// 4. Define o componente funcional ApolloWrapper
export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    // 5. Renderiza o ApolloProvider, que requer um ambiente de cliente
    <ApolloProvider client={apolloClient}>
      {children} {/* 6. Renderiza os filhos que este wrapper envolve */}
    </ApolloProvider>
  );
}