import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";

interface authorProps {
  author: string;
  created_at: string;
  content: string;
  author_details: {
    avatar_path: string;
    rating: number;
  };
}

interface propType {
  reviews: {
    results: authorProps[];
  };
}

export default function ReviewsArea({ reviews }: propType) {
  return (
    <Box>
      <Flex gap="80px" flexDir={"column"}>
        {reviews?.results.map(
          (review, index) =>
            index < 5 && (
              <Box
                py={{ base: "32px", md: "12px" }}
                px="12px"
                key={index}
                borderRadius={index % 2 == 0 ? "10px" : "0"}
                bg={index % 2 == 0 ? "#1c212e" : ""}
                position={"relative"}
              >
                <Flex
                  gap={{ sm: "15px", lg: "40px" }}
                  flexDir={{ sm: "column", md: "row" }}
                >
                  <Avatar
                    position={{ base: "absolute", md: "static" }}
                    left={{ base: "-20px", sm: "-20px" }}
                    top={{ base: "-20px", sm: "-30px" }}
                    size={{ base: "md", sm: "lg", md: "md" }}
                    name={review.author}
                    src={review.author_details.avatar_path}
                  />
                  <Flex flexDir={"column"} gap="20px">
                    <Flex flexDir={"column"} gap="8px">
                      <Heading
                        as="h6"
                        fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
                        textAlign={{ base: "center", md: "start" }}
                      >
                        {review.author}
                        {review.author_details.rating && (
                          <span> - {review.author_details.rating}/10</span>
                        )}
                      </Heading>

                      <Text
                        color="#fffd"
                        fontSize={{
                          base: "small",
                          sm: "smaller",
                          lg: "medium",
                        }}
                        textAlign={{ base: "center", lg: "start" }}
                      >
                        <span>
                          {review.created_at.split("T")[0].split("-")[2]}-
                        </span>
                        <span>
                          {review.created_at.split("T")[0].split("-")[1]}-
                        </span>
                        <span>
                          {review.created_at.split("T")[0].split("-")[0]}
                        </span>
                      </Text>
                    </Flex>
                    <Text
                      color="#fffd"
                      lineHeight={{ base: "24px", md: "32px" }}
                      fontSize={{ base: "smaller", sm: "medium", lg: "large" }}
                      textAlign={{ base: "justify", md: "start" }}
                      px={{ base: "10px", md: "0" }}
                    >
                      {review.content}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            )
        )}
      </Flex>
    </Box>
  );
}
