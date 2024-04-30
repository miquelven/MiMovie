import actionImg from "../assets/categoryImages/acao.webp";
import animationImg from "../assets/categoryImages/animacao.webp";
import adventureImg from "../assets/categoryImages/aventura.webp";
import cinemaTvImg from "../assets/categoryImages/cinemaTv.webp";
import comedyImg from "../assets/categoryImages/comedia.webp";
import crimeImg from "../assets/categoryImages/crime.webp";
import documentaryImg from "../assets/categoryImages/documentario.webp";
import dramaImg from "../assets/categoryImages/drama.webp";
import familyImg from "../assets/categoryImages/familia.webp";
import scieneFiction from "../assets/categoryImages/ficcaoCientifica.webp";
import warImg from "../assets/categoryImages/guerra.webp";
import historyImg from "../assets/categoryImages/historia.webp";
import misteryImg from "../assets/categoryImages/misterio.webp";
import musicImg from "../assets/categoryImages/musical.webp";
import romanceImg from "../assets/categoryImages/romance.webp";
import horrorImg from "../assets/categoryImages/terror.webp";
import thrillerImg from "../assets/categoryImages/thriller.webp";
import faroesteImg from "../assets/categoryImages/faroeste.webp";
import fantasiaImg from "../assets/categoryImages/fantasia.webp";

interface categoryItemProp {
  genreName: string;
  img: string;
  alt: string;
}

export const categoryData: categoryItemProp[] = [
  { genreName: "Ação", img: actionImg, alt: "Imagem de vários filmes de ação" },
  {
    genreName: "Animação",
    img: animationImg,
    alt: "Imagem de vários filmes de animação",
  },
  {
    genreName: "Aventura",
    img: adventureImg,
    alt: "Imagem de vários filmes de aventura",
  },
  {
    genreName: "Cinema TV",
    img: cinemaTvImg,
    alt: "Imagem de vários filmes de cinema TV",
  },
  {
    genreName: "Comédia",
    img: comedyImg,
    alt: "Imagem de vários filmes de comédia",
  },
  {
    genreName: "Crime",
    img: crimeImg,
    alt: "Imagem de vários filmes de crime",
  },
  {
    genreName: "Documentário",
    img: documentaryImg,
    alt: "Imagem de vários filmes de documentário",
  },
  {
    genreName: "Drama",
    img: dramaImg,
    alt: "Imagem de vários filmes de drama",
  },
  {
    genreName: "Família",
    img: familyImg,
    alt: "Imagem de vários filmes de familia",
  },
  {
    genreName: "Ficção científica",
    img: scieneFiction,
    alt: "Imagem de vários filmes de ficção cientifica",
  },
  {
    genreName: "Guerra",
    img: warImg,
    alt: "Imagem de vários filmes de guerra",
  },
  {
    genreName: "História",
    img: historyImg,
    alt: "Imagem de vários filmes de história",
  },
  {
    genreName: "Mistério",
    img: misteryImg,
    alt: "Imagem de vários filmes de mistério",
  },
  {
    genreName: "Música",
    img: musicImg,
    alt: "Imagem de vários filmes de musical",
  },
  {
    genreName: "Romance",
    img: romanceImg,
    alt: "Imagem de vários filmes de romance",
  },
  {
    genreName: "Terror",
    img: horrorImg,
    alt: "Imagem de vários filmes de terror",
  },
  {
    genreName: "Thriller",
    img: thrillerImg,
    alt: "Imagem de vários filmes de thriller",
  },
  {
    genreName: "Faroeste",
    img: faroesteImg,
    alt: "Imagem de vários filmes de faroeste",
  },
  {
    genreName: "Fantasia",
    img: fantasiaImg,
    alt: "Imagem de vários filmes de fantasia",
  },
];
