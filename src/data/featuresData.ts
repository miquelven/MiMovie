interface featureDataType {
  img: string;
  alt: string;
  title: string;
  description: string;
}

export const featureData: featureDataType[] = [
  {
    img: "/src/assets/best.svg",
    alt: "icone de uma medalha",
    title: "Melhores da Semana",
    description:
      "Não perca a chance de acessar os filmes mais notáveis da semana e desfrutar de uma experiência cinematográfica inesquecível!",
  },
  {
    img: "/src/assets/stars.svg",
    alt: "icone com três estrelas",
    title: "Favorite os Filmes",
    description:
      "Descubra novos favoritos, compartilhe suas opiniões e crie uma lista personalizada com os filmes que mais te cativaram.",
  },
  {
    img: "/src/assets/categories.svg",
    alt: "icone de seis quadrados representando as categorias",
    title: "Filtre por Categorias",
    description:
      "Com o recurso de filtragem por categorias, você pode navegar facilmente por gêneros específicos e encontrar os filmes que mais correspondem aos seus interesses. ",
  },
  {
    img: "/src/assets/time.svg",
    alt: "icone de uma ampulheta",
    title: "Assistir mais Tarde",
    description:
      'Com a opção "Assistir Mais Tarde", você pode manter uma lista organizada dos filmes que deseja assistir, garantindo que não perca nenhum deles.',
  },
];
