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
    <Box mt="160px">
      <Flex gap="80px" flexDir={"column"}>
        {reviews?.results.map(
          (review, index) =>
            index < 5 && (
              <Box
                py="12px"
                px="8px"
                borderRadius={index % 2 == 0 ? "10px" : "0"}
                bg={index % 2 == 0 ? "#1c212e" : ""}
              >
                <Flex gap="40px">
                  <Avatar
                    size="md"
                    name={review.author}
                    src={review.author_details.avatar_path}
                  />
                  <Flex flexDir={"column"} gap="20px">
                    <Flex flexDir={"column"} gap="8px">
                      <Heading as="h6">
                        {review.author}
                        <span> - {review.author_details.rating}/10</span>
                      </Heading>

                      <Text color="#fffd">
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
                    <Text color="#fffd" lineHeight={"32px"} fontSize={"lg"}>
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
