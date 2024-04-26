import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";

interface propType {
  title: string;
  description: string;
}

export default function TitleDescription({ title, description }: propType) {
  return (
    <Box>
      <Center>
        <Flex flexDir={"column"} textAlign={"center"} gap="24px">
          <Heading as="h1" fontSize={{ base: "xl", sm: "3xl", md: "4xl" }}>
            {title}
          </Heading>
          <Text color="#fff9" fontSize={{ base: "xs", sm: "sm", md: "medium" }}>
            {description}
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}
