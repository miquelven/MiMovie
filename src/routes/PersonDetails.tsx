import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Skeleton,
  Stack,
  SkeletonText,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGetPersonInfo from "../hooks/useGetPersonInfo";
import CarouselMovies from "../components/Carousel/CarouselMovies";
import { Helmet } from "react-helmet";

export default function PersonDetails() {
  const { id } = useParams();
  const { data: person, isPending } = useGetPersonInfo(id!);

  return (
    <>
      <Helmet>
        <title>MiMovies | {person?.name || "Detalhes"}</title>
      </Helmet>
      <main>
        <Container maxW="1580px" py="120px" px={{ base: "30px", md: "10px" }}>
          {isPending ? (
            <Stack direction={{ base: "column", md: "row" }} gap="40px">
              <Skeleton height="450px" width="300px" borderRadius="lg" />
              <Stack flex="1" gap="4">
                <Skeleton height="40px" width="50%" />
                <SkeletonText
                  mt="4"
                  noOfLines={6}
                  spacing="4"
                  skeletonHeight="3"
                />
                <Skeleton height="20px" width="30%" />
              </Stack>
            </Stack>
          ) : person ? (
            <>
              <Flex
                gap="40px"
                direction={{ base: "column", md: "row" }}
                alignItems="flex-start"
              >
                <Box
                  minW={{ base: "100%", md: "300px" }}
                  maxW={{ base: "100%", md: "300px" }}
                >
                  <Image
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/original/${person.profile_path}`
                        : "https://via.placeholder.com/300x450?text=Sem+Imagem"
                    }
                    borderRadius="lg"
                    alt={person.name}
                    w="100%"
                    objectFit="cover"
                    boxShadow="lg"
                  />
                </Box>
                <Box flex="1">
                  <Heading as="h1" size="2xl" mb="6" color="white">
                    {person.name}
                  </Heading>

                  {person.biography && (
                    <Box mb="6">
                      <Heading as="h3" size="md" mb="2" color="gray.300">
                        Biografia
                      </Heading>
                      <Text fontSize="md" color="gray.400" lineHeight="1.8">
                        {person.biography}
                      </Text>
                    </Box>
                  )}

                  <Flex gap="8" flexWrap="wrap">
                    {person.birthday && (
                      <Box>
                        <Heading as="h3" size="sm" mb="1" color="gray.300">
                          Nascimento
                        </Heading>
                        <Text color="gray.400">
                          {new Date(person.birthday).toLocaleDateString(
                            "pt-BR"
                          )}
                        </Text>
                      </Box>
                    )}
                    {person.place_of_birth && (
                      <Box>
                        <Heading as="h3" size="sm" mb="1" color="gray.300">
                          Local de Nascimento
                        </Heading>
                        <Text color="gray.400">{person.place_of_birth}</Text>
                      </Box>
                    )}
                    {person.known_for_department && (
                      <Box>
                        <Heading as="h3" size="sm" mb="1" color="gray.300">
                          Conhecido por
                        </Heading>
                        <Text color="gray.400">
                          {person.known_for_department}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Flex>

              <Box mt="80px">
                <Heading as="h2" size="xl" mb="8" color="white">
                  Conhecido por
                </Heading>
                <CarouselMovies
                  endpoint={`discover/movie?with_people=${id}&language=pt-BR&sort_by=popularity.desc&page=`}
                />
              </Box>
            </>
          ) : (
            <Text color="white">Pessoa não encontrada.</Text>
          )}
        </Container>
      </main>
    </>
  );
}
