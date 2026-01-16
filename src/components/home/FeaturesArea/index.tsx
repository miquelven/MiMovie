import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { featureData } from "../../../data/featuresData";

const MotionGridItem = motion(GridItem);

export default function FeaturesArea() {
  return (
    <section className="py-32">
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
          gap={{ base: "56px", md: "32px", lg: "40px" }}
          mx="auto"
        >
          {featureData.map((item, index) => (
            <MotionGridItem
              w="300px"
              mx="auto"
              key={index}
              className="lg:last:col-start-2 2xl:last:col-start-4"
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: "easeOut",
              }}
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
            </MotionGridItem>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
