<div align='center'>
   
   # 🎬 MiMovies
   
   > Um Projeto de Integração com a API do TMDB para descoberta de filmes.
   
   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
   [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
   [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
   [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

<br />

<img width="1910" height="991" alt="Image" src="https://github.com/user-attachments/assets/046b86f0-6cc9-445b-937a-e1e0c7ae38c0" />

<br />

## Sobre o Projeto

**MiMovies** é uma aplicação web moderna e responsiva desenvolvida para explorar o vasto mundo do cinema. Utilizando a API do The Movie Database (TMDB), o projeto permite aos usuários pesquisar filmes, visualizar detalhes, ver trailers, salvar favoritos e muito mais.

O objetivo deste projeto é demonstrar o uso de tecnologias modernas do ecossistema React, incluindo gerenciamento de estado global, requisições de dados assíncronas e estilização baseada em utilitários.

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **Core:** [React](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Gerenciamento de Estado:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Roteamento:** [React Router](https://reactrouter.com/)
- **UI Components:** [React Icons](https://react-icons.github.io/react-icons/), [Swiper](https://swiperjs.com/), [Chakra UI Icons](https://chakra-ui.com/)
- **Utilitários:** [Lodash](https://lodash.com/), [Axios](https://axios-http.com/)
- **Testes:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/)

## Funcionalidades

- ** Home Page:** Visualização de filmes em destaque, tendências e categorias.
- ** Pesquisa:** Busca eficiente de filmes por título.
- ** Categorias:** Filtragem de filmes por gêneros (Ação, Comédia, Drama, etc.).
- ** Detalhes do Filme:** Informações completas, incluindo sinopse, elenco, avaliações e filmes similares.
- ** Trailers:** Visualização de trailers diretamente na plataforma.
- ** Favoritos:** Lista personalizada de filmes favoritos (persistência local).
- ** Assistir Mais Tarde:** Lista de filmes salvos para ver depois.
- ** Responsividade:** Interface adaptável para dispositivos móveis e desktop.

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma chave de API do [TMDB](https://www.themoviedb.org/documentation/api)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/miquelven/MiMovie.git
   cd MiMovie
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configuração de Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API do TMDB (Token de Leitura da API):

   ```env
   VITE_API_KEY=sua_chave_api_aqui
   ```

   > **Nota:** O projeto utiliza autenticação via Bearer Token. Certifique-se de usar o **API Read Access Token** fornecido pelo TMDB.

4. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse o projeto**
   Abra seu navegador em `http://localhost:5173`

## Rodando os Testes

Para executar os testes unitários e de integração:

```bash
npm run test
```

## Estrutura de Pastas

```
src/
├── assets/        # Imagens e ícones estáticos
├── components/    # Componentes React reutilizáveis
├── data/          # Dados estáticos (categorias, features)
├── helpers/       # Funções auxiliares (API, formatação)
├── hooks/         # Custom Hooks (React Query, lógica de negócios)
├── routes/        # Páginas da aplicação (Views)
├── stores/        # Gerenciamento de estado global (Zustand)
├── types/         # Definições de tipos TypeScript
└── ...
```

