import { CloseIcon, SearchIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useGetSearchMovie from "../../../../hooks/useGetSearchMovie";
import { useOutsideClick } from "@chakra-ui/react";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import setCurrentMovie from "../../../../helpers/setCurrentMovie";
import TmdbImage from "../../TmdbImage";

export default function InputSearchArea() {
  const inputArea = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState("");

  const [searchParams] = useDebounce([inputSearch], 1000);

  const { data, isPending } = useGetSearchMovie(searchParams);

  const [showSearchResults, setShowSearchResults] = useState(false);

  useOutsideClick({
    ref: inputArea,
    handler: () => setShowSearchResults(false),
  });

  const handleClick = (id: number) => {
    setCurrentMovie(id);
    setShowSearchResults(false);
    setInputSearch("");
  };

  const redirectToSearchMovieResults = () => {
    navigate(`/search/${inputSearch}`);
    setInputSearch("");
    setShowSearchResults(false);
  };

  const handleClearSearch = () => {
    setInputSearch("");
    setShowSearchResults(false);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && inputSearch.trim().length > 0) {
      redirectToSearchMovieResults();
    }
  };

  useEffect(() => {
    if (data) {
      const resultsLength = data.results.length;

      if (resultsLength == 0) {
        setShowSearchResults(false);
      } else if (resultsLength > 0 && showSearchResults == false) {
        setShowSearchResults(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box
      ref={inputArea}
      width={[1 / 3, null, null, 5 / 12]}
      position={"relative"}
    >
      <label htmlFor="Search">
        <InputGroup width={"100%"} size={["sm", null, null, "md"]}>
          <InputLeftElement
            pointerEvents="none"
            pl="14px"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SearchIcon color="#9ca3af" boxSize={4} />
          </InputLeftElement>
          <Input
            name="Search"
            id="Search"
            rounded="full"
            variant="unstyled"
            bg="rgba(10, 13, 20, 0.95)"
            borderWidth="1px"
            borderColor="#23a7d733"
            focusBorderColor="#23a7d7"
            _hover={{ borderColor: "#23a7d7aa" }}
            _focus={{
              borderColor: "#23a7d7",
              boxShadow: "0 0 0 1px #23a7d7",
            }}
            color="#f3f4f6"
            placeholder="Buscar filmes..."
            _placeholder={{ color: "#9ca3af" }}
            pl="44px"
            pr="48px"
            minH={{ base: "40px", md: "46px" }}
            value={inputSearch ? inputSearch : ""}
            onFocus={() => setShowSearchResults(true)}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          {inputSearch.length > 0 && (
            <InputRightElement
              pr="10px"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                size="sm"
                variant="ghost"
                bg="transparent"
                _hover={{ bg: "whiteAlpha.100" }}
                aria-label="Limpar busca"
                color="#e5e7eb"
                icon={<CloseIcon boxSize={3} />}
                onClick={handleClearSearch}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </label>

      <Box pos={"relative"} width="100%">
        <Collapse
          in={showSearchResults && inputSearch.length > 0}
          animateOpacity
        >
          <Box
            as="ul"
            id="searchVideosResults"
            position="absolute"
            top="100%"
            right="0"
            mt="2"
            bg="#0a0d14"
            w={{ base: "90vw", sm: "100%" }}
            maxW={{ base: "100vw", sm: "100%" }}
            maxH={{ base: "60vh", md: "80vh" }}
            overflowY="auto"
            borderRadius="md"
            boxShadow="dark-lg"
            zIndex="dropdown"
            border="1px solid"
            borderColor="#2d323f"
            left={{ base: "50%", sm: "auto" }}
            transform={{ base: "translateX(-50%)", sm: "none" }}
          >
            {!isPending ? (
              data?.results && data.results.length > 0 ? (
                data.results.map((item) => (
                  <Box
                    as="li"
                    key={item.id}
                    borderBottom="1px solid"
                    borderColor="#2d323f"
                    _last={{ borderBottom: "none" }}
                  >
                    <Link
                      to={`/${item.title.split(" ").join("-")}`}
                      onClick={() => handleClick(item.id)}
                    >
                      <Flex
                        p="10px"
                        align="center"
                        _hover={{ bg: "#131722" }}
                        transition="background 0.2s"
                        cursor="pointer"
                      >
                        <Box
                          w="45px"
                          h="68px"
                          borderRadius="md"
                          overflow="hidden"
                          flexShrink={0}
                          mr="12px"
                          bg="gray.800"
                        >
                          <TmdbImage
                            path={item.poster_path}
                            type="poster"
                            alt={item.title}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                          />
                        </Box>
                        <VStack
                          align="start"
                          spacing="2px"
                          flex="1"
                          overflow="hidden"
                        >
                          <Text
                            color="white"
                            fontWeight="semibold"
                            fontSize="sm"
                            noOfLines={1}
                            w="100%"
                          >
                            {item.title}
                          </Text>
                          <HStack spacing="10px" fontSize="xs" color="gray.400">
                            {item.release_date && (
                              <Text>
                                {new Date(item.release_date).getFullYear()}
                              </Text>
                            )}
                            {item.vote_average > 0 && (
                              <HStack spacing="2px">
                                <StarIcon color="yellow.400" boxSize="3" />
                                <Text>{item.vote_average.toFixed(1)}</Text>
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </Flex>
                    </Link>
                  </Box>
                ))
              ) : (
                <Flex p="20px" justify="center" align="center" color="gray.500">
                  <Text>Nenhum resultado encontrado.</Text>
                </Flex>
              )
            ) : (
              <Flex p="20px" justify="center" align="center">
                <Spinner color="cyan.400" size="sm" mr="2" />
                <Text color="gray.400" fontSize="sm">
                  Buscando...
                </Text>
              </Flex>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
