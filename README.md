# Feedback Hub (Leve Saúde)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## 📝 Descrição

Este é um aplicativo móvel de exemplo, desenvolvido como parte de um desafio técnico. O **Feedback Hub** permite que os usuários se cadastrem, façam login e visualizem uma lista de feedbacks, demonstrando a integração de um front-end mobile com serviços de back-end como o Firebase para autenticação e banco de dados.

## ✨ Funcionalidades

- [x] **Autenticação de Usuários:** Sistema completo de cadastro (signup) e login.
- [x] **Gerenciamento de Sessão:** Mantém o usuário logado de forma segura.
- [x] **Visualização de Feedbacks:** Tela principal que exibe uma lista de feedbacks.
- [x] **Navegação Protegida:** Rotas que só podem ser acessadas por usuários autenticados.
- [x] **Estrutura Escalável:** Código organizado com foco em componentização e separação de responsabilidades.

## 🚀 Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.
- **Expo Router:** Sistema de roteamento baseado em arquivos para uma navegação declarativa.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
- **Firebase:**
  - **Authentication:** Para gerenciamento de usuários.
  - **Firestore:** Como banco de dados NoSQL para armazenar os feedbacks.
- **React Context API:** Para gerenciamento de estado global (ex: estado de autenticação).

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (opcional, mas recomendado)

## ▶️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Jeffinp/test-mobile-leve-saude
    cd test-mobile-leve-saude
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Este projeto utiliza o Firebase. Para conectar com a sua própria instância, crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes chaves:

    ```env
    EXPO_PUBLIC_FIREBASE_API_KEY="SUA_API_KEY"
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    EXPO_PUBLIC_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
    EXPO_PUBLIC_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
    ```

Após executar o comando, o Metro Bundler será aberto no seu navegador. Você poderá então abrir o aplicativo em:

- Um emulador Android
- Um simulador de iOS
- Seu próprio dispositivo físico usando o app Expo Go

## 📂 Estrutura do Projeto

O projeto é organizado da seguinte forma para facilitar a manutenção e escalabilidade:

```
test-mobile-leve-saude/
├── app/                # Definição das rotas e telas usando Expo Router
│   ├── (auth)/         # Rotas de autenticação (login, signup)
│   └── (tabs)/         # Rotas principais após o login
├── assets/             # Imagens, fontes e outros arquivos estáticos
├── components/         # Componentes React reutilizáveis
├── constants/          # Constantes globais (cores, estilos)
├── context/            # Contextos React para gerenciamento de estado
├── hooks/              # Hooks customizados
├── lib/                # Módulos e bibliotecas (configuração do Firebase)
└── ...
```

---

## 🔍 Análise Detalhada do Projeto

Após analisar o código-fonte completo do projeto, aqui está um resumo abrangente:

### Estrutura Geral

- O aplicativo é um app móvel React Native gerenciado pelo Expo, com roteamento via Expo Router.
- Dividido em pastas como `app/` para rotas, `components/` para UI reutilizável, `context/` para estado global, `hooks/` para lógica customizada, `lib/` para integrações externas (Firebase), e `constants/` para temas e cores.

### Funcionalidades Principais

- **Autenticação**: Usuários podem se cadastrar e logar via Firebase Authentication. O estado é gerenciado pelo `AuthContext` com listener para mudanças de autenticação.
- **Envio de Feedback**: Na tela Home (`app/(tabs)/index.tsx`), usuários avaliam com estrelas (1-5) e adicionam comentários (mín. 10 caracteres). Feedbacks são salvos no Firestore com timestamp.
- **Visualização de Feedbacks**: Na tela "Meus Feedbacks" (`app/(tabs)/myFeedbacks.tsx`), lista feedbacks do usuário atual do Firestore, ordenados por data.
- **Navegação**: Abas com ícones customizados e feedback háptico. Rotas protegidas redirecionam não-autenticados para login.
- **Logout**: Botão para sair da conta, integrado ao AuthContext.

### Integrações

- **Firebase**: Authentication para auth, Firestore para armazenar feedbacks (coleção 'feedbacks' com userId, rating, comment, etc.).
- **Expo Components**: Router para navegação, Haptics para vibração, Symbols para ícones iOS.

### Componentes e Hooks Chave

- **Componentes**: `ThemedText`, `ThemedView` para UI consistente; `HapticTab` para abas com vibração; `IconSymbol` e `TabBarBackground` para customização de tabs.
- **Hooks**: `useAuth` para contexto de autenticação.
- **Estilos**: Constantes em `Colors.ts` para consistência visual.

### Observações

- O app é escalável, com boa separação de preocupações.
- Pontos de melhoria: Adicionar validações mais robustas, suporte offline, ou testes unitários.
- Total de arquivos: Aproximadamente 30, com foco em TypeScript para tipagem segura.

Esta análise foi gerada com base na inspeção semântica do código. Para atualizações, revise o codebase.

---

Feito com ❤️ para o desafio Leve Saúde.
