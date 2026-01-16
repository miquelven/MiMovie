import { Box, Center, Heading } from "@chakra-ui/react";

interface propType {
  category: {
    img: string;
    genreName: string;
  };
}

export default function ListCategoriesItem({ category }: propType) {
  return (
    <Box className="transition-all duration-700 px-10  cursor-pointer h-[200px] hover:p-0 max-sm:px-4 sm:h-[300px] md:h-[400px]">
      <img
        src={category.img}
        alt={category.genreName}
        loading="lazy"
        decoding="async"
        className="transition-all duration-700 object-cover h-[150px] w-full hover:h-5/6 sm:h-[200px] md:h-[300px]"
      />
      <Center>
        <Heading
          as="h5"
          fontSize={{ sm: "lg", lg: "2xl" }}
          fontWeight={"semibold"}
          mt="20px"
        >
          {category.genreName}
        </Heading>
      </Center>
    </Box>
  );
}
