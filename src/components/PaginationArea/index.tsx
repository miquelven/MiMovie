import { Box, Center, Flex } from "@chakra-ui/react";
import CurrentPaginationButton from "./CurrentPaginationButton";
import PaginationButton from "./PaginationButton";

interface infosType {
  infos: {
    setPage: (value: number) => void;
    pageSelected: number;
    isPending: boolean;
    totalPages: number;
  };
}

export default function PaginationArea({ infos }: infosType) {
  return (
    <Box position={"absolute"} bottom={"-80px"} left="50%" right="50%">
      <Center>
        <Flex fontSize={{ base: "medium", sm: "large" }}>
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
          <CurrentPaginationButton>
            {infos.pageSelected}
          </CurrentPaginationButton>
          {infos.pageSelected < infos.totalPages &&
            infos.pageSelected < 500 && (
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
