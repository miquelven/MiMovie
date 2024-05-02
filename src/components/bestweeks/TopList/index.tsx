import { Box, Divider, Flex, Heading, Skeleton } from "@chakra-ui/react";
import TopListItem from "./TopListItem";

interface itemType {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
}

interface PropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isPending: boolean;
}

export default function TopList({ data, isPending }: PropsType) {
  return (
    <>
      <Skeleton
        flex={"1"}
        isLoaded={!isPending}
        startColor="#2d323f"
        endColor="#131722"
        maxH={"100%"}
        maxW="700px"
      >
        <Box bg="#1c212e" p="20px" mx="auto">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Heading
              as="h3"
              fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
              fontWeight={"medium"}
            >
              Top 10 da Semana
            </Heading>
            <span className="text-[#23a7d7] font-bold text-xs sm:text-sm xl:text-base">
              Filmes
            </span>
          </Flex>
          <Divider mt="16px" mb="32px" borderColor={"#fff4"} />
          {!isPending &&
            data?.results.map(
              (item: itemType, index: number) =>
                index < 10 && (
                  <TopListItem item={item} key={index} ranked={index + 1} />
                )
            )}
        </Box>
      </Skeleton>
    </>
  );
}
