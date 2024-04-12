import { Box, Center, Flex } from "@chakra-ui/react";
import CurrentPagintaionButton from "./CurrentPaginationButton";
import PaginationButton from "./PaginationButton";

interface infosType {
  infos: {
    setPage: (value: number) => void;
    pageSelected: number;
    isPending: boolean;
  };
}

export default function Pagination({ infos }: infosType) {
  return (
    <Box position={"absolute"} bottom={"-80px"} left="50%" right="50%">
      <Center>
        <Flex gap="24px" fontSize={{ base: "medium", sm: "large" }}>
          {infos.pageSelected > 1 && (
            <>
              <PaginationButton infos={{ ...infos, type: "prev" }}>
                Anterior
              </PaginationButton>
              <PaginationButton infos={{ ...infos, type: "prev" }}>
                {infos.pageSelected - 1}
              </PaginationButton>
            </>
          )}
          <CurrentPagintaionButton>
            {infos.pageSelected}
          </CurrentPagintaionButton>
          {infos.pageSelected < 500 && (
            <>
              <PaginationButton infos={infos}>
                {infos.pageSelected + 1}
              </PaginationButton>
              <PaginationButton infos={infos}>Próximo</PaginationButton>
            </>
          )}
        </Flex>
      </Center>
    </Box>
  );
}
