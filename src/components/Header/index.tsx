import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Fade,
  Flex,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Slide,
  Spacer,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container maxW="1580px" py="10">
      <header>
        <Flex
          minWidth="max-content"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading as="h1" size={["xs", null, null, "lg"]} color="#c7c7c7">
            MiMovies
          </Heading>
          <InputGroup
            width={[1 / 3, null, null, 5 / 12]}
            size={["sm", null, null, "md"]}
          >
            <Input
              rounded="xl"
              variant="outline"
              borderColor="#c7c7c7"
              focusBorderColor="#777"
            />
            <InputRightElement>
              <IconButton
                size="md"
                colorScheme="transparent"
                aria-label="Search"
                color="#c7c7c7"
                icon={<SearchIcon />}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            variant="unstyle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ zIndex: 20 }}
            position={"relative"}
          >
            <Fade in={!isOpen}>
              <IconButton
                color="#c7c7c7"
                _hover={{ color: "#777", fontSize: "4xl" }}
                transition={"all ease-in-out 250ms"}
                fontSize="3xl"
                colorScheme="transparent"
                aria-label="Menu"
                icon={<HamburgerIcon />}
                style={{ zIndex: "20" }}
                position={"absolute"}
                top="0"
                left="0"
              />
            </Fade>
            <Fade in={isOpen}>
              <IconButton
                color="#c7c7c7"
                _hover={{ color: "#777", fontSize: "3xl" }}
                transition={"all ease-in-out 250ms"}
                fontSize={["xl", null, null, "2xl"]}
                colorScheme="transparent"
                aria-label="Menu"
                icon={<CloseIcon />}
                position={"absolute"}
                top="0"
                left="0"
              />
            </Fade>
          </Button>
          <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
            <Box bg="#0a0d14" height="100vh">
              <Flex
                width={"100vw"}
                height={"100vh"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Center>
                  <Flex flexDirection="column" alignItems="center" gap="72px">
                    <Link to="/uncoming">
                      <Heading
                        as="h3"
                        position={"relative"}
                        opacity={"50%"}
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Lançamentos
                        <Divider
                          position={"absolute"}
                          left={"-12px"}
                          top="50%"
                          borderWidth={["2px", null, null, "3px"]}
                          rounded={"xl"}
                          width={"calc(100% + 20px)"}
                        />
                      </Heading>
                    </Link>
                    <Link to="/best">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Melhores da Semana
                      </Heading>
                    </Link>
                    <Link to="/category">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Categorias
                      </Heading>
                    </Link>
                    <Link to="/favoritos">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Favoritos
                      </Heading>
                    </Link>
                    <Link to="/latestView">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Assistir Mais Tarde
                      </Heading>
                    </Link>
                  </Flex>
                </Center>
              </Flex>
            </Box>
          </Slide>
        </Flex>
      </header>
    </Container>
  );
}
