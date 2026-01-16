# Ideias de features para evoluir o MiMovies

Este arquivo lista sugestões de melhorias e novas funcionalidades para deixar o MiMovies mais completo e atrativo para portfólio front end.

## UX/UI e experiência do usuário

- [ ] Tema claro/escuro com toggle fixo no header usando o theming do Chakra UI.
- [x] Animações de transição entre páginas (React Router) com framer-motion.
- [x] Estados de loading mais ricos (skeletons, shimmer) em todas as listas e banners.
- [x] Empty states dedicados para páginas sem resultados (busca, categorias, favoritos, assistir mais tarde).
- [x] Feedback visual mais forte para ações de favoritar / assistir mais tarde (micro animações, toasts customizados).
- [x] Melhorar acessibilidade: navegação por teclado, foco visível, alt text revisado e aria-labels em carrosséis e botões icônicos.

## Descoberta e organização de conteúdo

- [x] Filtros avançados nas listagens: ano de lançamento, nota mínima, idioma e duração.
- [x] Ordenação nas listas (mais populares, melhor avaliados, mais recentes, A-Z).
- [x] Seção de “Tendências de hoje / em alta” consumindo endpoints específicos da API.
- [ ] Páginas de pessoas (atores/diretores) com biografia, filmes em que atuaram e carrossel de títulos relacionados.
- [ ] Seção “Continuar assistindo” baseada nos últimos filmes acessados (armazenados em localStorage).
- [ ] Área “Para você” com recomendações baseadas nos gêneros mais recorrentes entre os favoritos do usuário.

## Performance, qualidade e boas práticas

- [ ] Transformar o projeto em PWA completo (service worker, manifest revisado, tela de instalação).
- [ ] Otimizar imagens (lazy loading mais agressivo, resolução adaptativa para mobile/desktop).
- [ ] Paginação com infinite scroll opcional em algumas seções, mantendo a paginação tradicional como fallback.
- [ ] Melhor tratamento de erros de rede e timeouts com mensagens amigáveis e opção de tentar novamente.
- [ ] Adicionar testes básicos de componentes chave (Banner, Header, CardMovie, rotas principais) com React Testing Library.

## SEO e marketing do produto

- [ ] Refinar SEO das rotas (title, description, keywords) e revisar todos os Helmet já existentes.
- [ ] Adicionar marcação estruturada (JSON-LD) para filmes individuais, melhorando destaque em buscadores.
- [ ] Criar seção de “Depoimentos” ou “Perguntas Frequentes” na Home para deixar o produto com cara de app real.
