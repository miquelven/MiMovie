import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import TopListItem from "./TopListItem";

interface itemType {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

interface PropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isPending: boolean;
}

export default function TopList({ data, isPending }: PropsType) {
  return (
    <>
      {!isPending && (
        <Box flex={"1"} bg="#1c212e" p="20px" maxH={"1270px"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Heading as="h4" fontSize={"28px"} fontWeight={"medium"}>
              Top 10 da Semana
            </Heading>
            <span className="text-[#23a7d7] font-bold">Filmes</span>
          </Flex>
          <Divider mt="16px" mb="32px" borderColor={"#fff4"} />
          {data?.results.map(
            (item: itemType, index: number) =>
              index < 10 && (
                <TopListItem item={item} key={index} ranked={index + 1} />
              )
          )}
        </Box>
      )}
    </>
  );
}
