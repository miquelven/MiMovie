import actionImg from "../assets/categoryImages/acao.jpg";
import animationImg from "../assets/categoryImages/animacao.jpg";
import adventureImg from "../assets/categoryImages/aventura.jpg";
import cinemaTvImg from "../assets/categoryImages/cinemaTv.jpg";
import comedyImg from "../assets/categoryImages/comedia.jpg";
import crimeImg from "../assets/categoryImages/crime.jpg";
import documentaryImg from "../assets/categoryImages/documentario.jpg";
import dramaImg from "../assets/categoryImages/drama.avif";
import familyImg from "../assets/categoryImages/familia.webp";
import scieneFiction from "../assets/categoryImages/ficcaoCientifica.jpg";
import warImg from "../assets/categoryImages/guerra.jpg";
import historyImg from "../assets/categoryImages/historia.jpeg";
import misteryImg from "../assets/categoryImages/misterio.webp";
import musicImg from "../assets/categoryImages/musical.jpg";
import romanceImg from "../assets/categoryImages/romance.png";
import horrorImg from "../assets/categoryImages/terror.jpg";
import thrillerImg from "../assets/categoryImages/thriller.jpg";
import faroesteImg from "../assets/categoryImages/faroeste.jpg";
import fantasiaImg from "../assets/categoryImages/fantasia.jpg";

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
