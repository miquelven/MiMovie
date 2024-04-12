import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { featureData } from "../../data/featuresData";

export default function FeaturesArea() {
  return (
    <section className="bg-[#0a0d14] py-10 mb-40">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Grid
          templateColumns={{
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
          gap={{ base: "56px", md: "20px" }}
          mx="auto"
        >
          {featureData.map((item, index) => (
            <GridItem
              w="300px"
              mx="auto"
              key={index}
              className="lg:last:col-start-2 lg:last:mt-10 2xl:last:col-start-4 2xl:last:mt-0"
            >
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                gap="40px"
              >
                <img src={item.img} alt={item.alt} width="40%" />
                <Flex flexDir={"column"} gap="24px">
                  <Heading as="h5" fontSize={{ base: "md", sm: "2xl" }}>
                    {item.title}
                  </Heading>
                  <Text
                    color="#fff9"
                    fontSize={{ base: "xs", sm: "medium" }}
                    lineHeight={{ base: "20px", sm: "28px" }}
                  >
                    {item.description}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
