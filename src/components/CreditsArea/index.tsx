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

interface crewType {
  name: string;
  profile_path: string;
}

interface castType {
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
      <Divider mb="80px" />
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
                <Flex flexDir={"column"} gap="8px">
                  <Flex flexDir="column" alignItems={"center"} gap="16px">
                    <Text fontSize="xl" fontWeight={"bold"} color="#fff">
                      {cast.name}
                    </Text>
                    <Avatar
                      size="2xl"
                      src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                    ></Avatar>
                  </Flex>
                  <Text color="#fffa" textAlign={"center"}>
                    Ator
                  </Text>
                </Flex>
              </GridItem>
            )
        )}
        <GridItem mx="auto">
          <Flex
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
            gap="8px"
          >
            <Flex flexDir="column" alignItems={"center"} gap="16px">
              <Text fontSize="xl" fontWeight={"bold"} color="#fff">
                {credits?.crew[0].name}{" "}
              </Text>
              <Avatar
                size="2xl"
                src={`https://image.tmdb.org/t/p/original/${credits?.crew[0].profile_path}`}
              ></Avatar>
            </Flex>
            <Text color="#fffa">Diretor</Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
