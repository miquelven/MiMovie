import { Box, Center, Heading } from "@chakra-ui/react";

interface propType {
  category: {
    img: string;
    genreName: string;
  };
}

export default function ListCategoriesItem({ category }: propType) {
  return (
    <Box
      role="group"
      className="group cursor-pointer transition-all duration-300"
      bg="#1c212e"
      borderRadius="xl"
      overflow="hidden"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        bg: "#2d323f",
      }}
      h="full"
    >
      <Box
        overflow="hidden"
        height={{ base: "180px", sm: "220px", md: "260px" }}
      >
        <img
          src={category.img}
          alt={category.genreName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Box>
      <Center p="6">
        <Heading
          as="h5"
          fontSize={{ base: "lg", lg: "xl" }}
          fontWeight={"semibold"}
          color="white"
          transition="color 0.3s"
          _groupHover={{ color: "#23a7d7" }}
        >
          {category.genreName}
        </Heading>
      </Center>
    </Box>
  );
}
