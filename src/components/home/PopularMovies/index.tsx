import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useGetMovies from "../../../hooks/useGetMovies";
import CardMovie from "../../CardMovie";

import "./style.css";

interface itemType {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);

export default function PopularMovies() {
  const { data, isPending } = useGetMovies(
    "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=",
    1
  );

  return (
    <section className="bg-[#0a0d14] py-32">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <MotionGrid
            id="popularMoviesGrid"
            templateColumns={{
              base: "repeat(1, 300px)",
              sm: "repeat(2, 200px)",
              md: "repeat(3, 200px)",
              lg: "repeat(5, 150px)",
              xl: "repeat(6, 200px)",
              "2xl": "repeat(7, 1fr)",
            }}
            gap="24px"
            rowGap={"60px"}
            overflow="visible"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <MotionGridItem
              colSpan={{ base: 1, sm: 2, md: 3, lg: 2 }}
              mb={{ base: "32px" }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Center h="100%">
                <Flex flexDir={"column"} gap="52px">
                  <Box>
                    <Heading as="h3">
                      Filmes Populares para Assistir Agora
                    </Heading>
                    <Text mt="16px" color="#fff9">
                      Filmes mais assistidos
                    </Text>
                  </Box>

                  <Link to="/populares" className="max-sm:hidden">
                    <Box
                      as="button"
                      px={{ base: 6, md: 7 }}
                      py={{ base: 2, md: 2.5 }}
                      borderRadius="full"
                      bg="rgba(10, 13, 20, 0.9)"
                      borderWidth="1px"
                      borderColor="#23a7d733"
                      fontWeight="semibold"
                      fontSize={{ base: "xs", md: "sm" }}
                      letterSpacing="0.06em"
                      textTransform="uppercase"
                      transition="all 0.2s ease"
                      color="#e5e7eb"
                      backdropFilter="blur(10px)"
                      _hover={{
                        color: "#0a0d14",
                        bg: "#1f9bc9",
                        borderColor: "#38bdf8",
                        transform: "translateY(-2px)",
                      }}
                      _active={{
                        bg: "#1a88b0",
                        borderColor: "#23a7d7",
                        transform: "translateY(0)",
                      }}
                    >
                      Ver mais
                    </Box>
                  </Link>
                </Flex>
              </Center>
            </MotionGridItem>
            {isPending &&
              Array.from({ length: 7 }).map((_, index) => (
                <GridItem key={`popular-skeleton-${index}`}>
                  <Skeleton
                    startColor="#2d323f"
                    endColor="#131722"
                    height="230px"
                    borderRadius="md"
                  />
                </GridItem>
              ))}
            {!isPending &&
              data &&
              data.results.map(
                (item: itemType, index: number) =>
                  index < 12 && <CardMovie key={index} data={item} />
              )}
          </MotionGrid>
          <Link to="/populares" className="sm:hidden">
            <Box
              as="button"
              mt="14"
              px={7}
              py={2.5}
              borderRadius="full"
              bg="rgba(10, 13, 20, 0.9)"
              borderWidth="1px"
              borderColor="#23a7d733"
              fontWeight="semibold"
              fontSize="xs"
              letterSpacing="0.06em"
              textTransform="uppercase"
              transition="all 0.2s ease"
              color="#e5e7eb"
              backdropFilter="blur(10px)"
              _hover={{
                color: "#0a0d14",
                bg: "#1f9bc9",
                borderColor: "#38bdf8",
                transform: "translateY(-2px)",
              }}
              _active={{
                bg: "#1a88b0",
                borderColor: "#23a7d7",
                transform: "translateY(0)",
              }}
            >
              Ver mais
            </Box>
          </Link>
        </Flex>
      </Container>
    </section>
  );
}
