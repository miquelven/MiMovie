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
}

interface castType {
  id: number;
  name: string;
  profile_path: string;
}

interface propType {
  credits: {
    cast: castType[];
    crew: crewType[];
  };
}

export default function CreditsArea({ credits }: propType) {
  return (
    <Box my="200px">
      <Heading mb="32px" as="h4">
        Elenco
      </Heading>
      <Divider mb={{ base: "60px", sm: "80px" }} />
      <Grid
        templateColumns={"repeat(2,1fr)"}
        mx="auto"
        alignItems={"center"}
        gap="40px"
        rowGap={"60px"}
      >
        {credits?.cast.map(
          (cast, index) =>
            index < 5 && (
              <GridItem mx="auto" key={index}>
                <Link to={`/person/${cast.id}`}>
                  <Flex flexDir={"column"} gap="8px" _hover={{ opacity: 0.8, transform: "scale(1.05)", transition: "all 0.3s" }}>
                    <Flex flexDir="column" alignItems={"center"} gap="16px">
                      <Text
                        fontSize={{ base: "lg", sm: "xl" }}
                        fontWeight={"bold"}
                        color="#fff"
                      >
                        {cast.name}
                      </Text>
                      <Avatar
                        size={{ base: "xl", sm: "2xl" }}
                        src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                      ></Avatar>
                    </Flex>
                    <Text
                      color="#fffa"
                      textAlign={"center"}
                      fontSize={{ base: "smaller", sm: "medium" }}
                    >
                      Ator
                    </Text>
                  </Flex>
                </Link>
              </GridItem>
            )
        )}
        <GridItem mx="auto">
          {credits?.crew[0] && (
            <Link to={`/person/${credits.crew[0].id}`}>
              <Flex
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
                gap="8px"
                _hover={{ opacity: 0.8, transform: "scale(1.05)", transition: "all 0.3s" }}
              >
                <Flex flexDir="column" alignItems={"center"} gap="16px">
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight={"bold"}
                    color="#fff"
                  >
                    {credits?.crew[0].name}{" "}
                  </Text>
                  <Avatar
                    size={{ base: "xl", sm: "2xl" }}
                    src={`https://image.tmdb.org/t/p/original/${credits?.crew[0].profile_path}`}
                  ></Avatar>
                </Flex>
                <Text color="#fffa" fontSize={{ base: "smaller", sm: "medium" }}>
                  Diretor
                </Text>
              </Flex>
            </Link>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
