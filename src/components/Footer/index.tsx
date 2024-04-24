import {
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import useGetAllGenres from "../../hooks/useGetAllGenres";
import { Link } from "react-router-dom";

import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useLocalStorage } from "usehooks-ts";

interface genreType {
  id: number;
  name: string;
}

const socialMedia = [
  {
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
  },
];

interface selectedGenreType {
  id: number;
  name: string;
}

export default function Footer() {
  const { data, isPending } = useGetAllGenres();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedGenre, setSelectedGenre] =
    useLocalStorage<selectedGenreType | null>("selectedGenre", null);

  console.log(selectedGenre);

  return (
    <footer className="bg-[#0a0d14] pt-10">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Heading as="h1" size={"lg"} color="#fff" mb="24px">
            MiMovies
          </Heading>
          <Flex
            gap={{ base: "28px", sm: "40px" }}
            color="#fff9"
            mb={{ base: "24px", sm: "0px" }}
          >
            {socialMedia.map((item, index) => (
              <Link to="#" key={index}>
                <Flex alignItems={"center"} gap="8px">
                  <Icon
                    as={item.icon}
                    fontSize={{ base: "20px", sm: "24px" }}
                  />
                  <Text fontSize="xs" className="hidden sm:block">
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </Flex>
        <Divider />
        <Heading
          as="h5"
          my="40px"
          fontSize={{ base: "sm", sm: "medium" }}
          color="#c7c7c7"
        >
          Categorias
        </Heading>
        <ul>
          <Grid templateColumns={"repeat(3, 1fr)"} gap="16px" mb="80px">
            {!isPending &&
              data.genres.map((genre: genreType) => (
                <GridItem
                  key={genre.id}
                  fontSize={{ base: "xs", sm: "sm" }}
                  color="#fff9"
                  _hover={{ color: "#fff" }}
                >
                  <Link
                    onClick={() =>
                      setSelectedGenre({ id: genre.id, name: genre.name })
                    }
                    to={`/categorias/${genre.name.split(" ").join("-")}`}
                  >
                    {genre.name}
                  </Link>
                </GridItem>
              ))}
          </Grid>
        </ul>
        <Divider />
        <Center w="100%">
          <Text my="16px" color="#fff9" fontSize={{ base: "xs", sm: "sm" }}>
            Desenvolvido por <span className="text-white">Miquelven</span>
          </Text>
        </Center>
      </Container>
    </footer>
  );
}
