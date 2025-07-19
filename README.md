# 🚀 Projeto: chave7-tasks

Aplicação de gerenciamento de tarefas desenvolvida com **Next.js 15**, **GraphQL** e **Tailwind CSS**. Criada como parte de um teste técnico, a aplicação foca em boas práticas de arquitetura, responsividade e testes automatizados.

---

## 🌐 Link da Aplicação Publicada

🔗 **Deploy na Vercel:** [https://chave7-tasks.vercel.app](https://chave7-tasks.vercel.app)

---

## 🧩 Tecnologias Utilizadas

- **Next.js 15 (App Router)**
- **TypeScript**
- **GraphQL (Apollo Server & Client)**
- **Tailwind CSS**
- **Jest & React Testing Library**

---

## 💻 Instruções para Rodar Localmente

```bash
# 1. Clone o repositório
$ git clone https://github.com/Glestman/chave7-tasks.git
$ cd chave7-tasks

# 2. Instale as dependências
$ npm install

# 3. Inicie o ambiente de desenvolvimento
$ npm run dev

# Acesse a aplicação em:
# http://localhost:3000
```

### 📁 Endpoint local do Apollo GraphQL

```bash
http://localhost:3000/api/graphql
```

---

## 🧪 Instruções para Executar os Testes

```bash
# Executar testes com Jest
$ npx jest src/tests/TaskList.test.tsx
```

> Certifique-se de que o ambiente esteja configurado com `ts-jest` e `tsconfig.jest.json`, caso esteja utilizando TypeScript.

---

## ✨ Abordagem e Diferenciais

- **Arquitetura Modular:** Separacão clara entre componentes, layouts e lógica GraphQL.
- **API com Apollo Server:** Implementada via App Router (`app/api/graphql/route.ts`).
- **UI Responsiva:** Estilização moderna com Tailwind CSS.
- **Testes Automatizados:** Testes com Jest e React Testing Library.
- **Publicação com Vercel:** Deploy simplificado e contínuo via GitHub.

---

## 📌 Repositório no GitHub

🔗 [https://github.com/Glestman/chave7-tasks](https://github.com/Glestman/chave7-tasks)

---

Feito com 💡 por **Ramon Glestman**
