import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface crewType {
  id: number;
  name: string;
  profile_path: string;
  job?: string;
}

interface castType {
  id: number;
  name: string;
  profile_path: string;
  character?: string;
}

interface propType {
  credits: {
    cast: castType[];
    crew: crewType[];
  };
}

export default function CreditsArea({ credits }: propType) {
  return (
    <Box mt={{ base: "60px", md: "80px" }}>
      <Heading mb="32px" as="h4">
        Elenco
      </Heading>
      <Divider mb={{ base: "60px", sm: "80px" }} />
      <Flex
        gap={{ base: "40px", lg: "60px" }}
        flexDir={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "flex-start" }}
      >
        <Box
          minW={{ lg: "260px" }}
          maxW={{ lg: "280px" }}
          w={{ base: "100%", lg: "auto" }}
        >
          {credits?.crew[0] && (
            <Link to={`/person/${credits.crew[0].id}`}>
              <Box
                role="group"
                bg="#0a0d14"
                borderRadius="lg"
                p="16px"
                borderWidth="1px"
                borderColor="#23a7d733"
                transition="all 0.3s ease"
                _hover={{
                  borderColor: "#23a7d7",
                  boxShadow: "0 18px 45px rgba(5, 5, 9, 0.9)",
                  transform: "translateY(-4px)",
                }}
              >
                <Flex flexDir="column" alignItems="center" gap="12px">
                  <Avatar
                    size="2xl"
                    name={credits.crew[0].name}
                    src={
                      credits.crew[0].profile_path
                        ? `https://image.tmdb.org/t/p/w185/${credits.crew[0].profile_path}`
                        : undefined
                    }
                  />
                  <Box textAlign="center">
                    <Text
                      fontSize={{ base: "lg", sm: "xl" }}
                      fontWeight="bold"
                      color="#fff"
                      noOfLines={2}
                    >
                      {credits.crew[0].name}
                    </Text>
                    <Text
                      mt="4px"
                      color="#9ca3af"
                      fontSize={{ base: "smaller", sm: "sm" }}
                    >
                      {credits.crew[0].job || "Direção"}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Link>
          )}
        </Box>

        <Grid
          flex="1"
          templateColumns={{
            base: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          }}
          gap={{ base: "24px", md: "32px" }}
        >
          {credits?.cast?.slice(0, 8).map((cast, index) => (
            <GridItem key={cast.id ?? index}>
              <Link to={`/person/${cast.id}`}>
                <Box
                  role="group"
                  bg="#0a0d14"
                  borderRadius="lg"
                  p="12px"
                  borderWidth="1px"
                  borderColor="transparent"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: "#23a7d733",
                    boxShadow: "0 18px 45px rgba(5, 5, 9, 0.9)",
                    transform: "translateY(-4px)",
                  }}
                >
                  <Flex flexDir="column" alignItems="center" gap="10px">
                    <Avatar
                      size={{ base: "lg", sm: "xl" }}
                      name={cast.name}
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                          : undefined
                      }
                    />
                    <Box textAlign="center">
                      <Text
                        fontSize={{ base: "sm", sm: "md" }}
                        fontWeight="bold"
                        color="#fff"
                        noOfLines={2}
                      >
                        {cast.name}
                      </Text>
                      <Text
                        mt="4px"
                        color="#9ca3af"
                        fontSize={{ base: "xs", sm: "smaller" }}
                        noOfLines={2}
                      >
                        {cast.character || "Elenco principal"}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}
