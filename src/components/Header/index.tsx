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
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  return (
    <Container
      maxW="1580px"
      px={{ base: "30px", md: "10px" }}
      position="relative"
    >
      <header className="absolute top-0 left-0 right-0 mt-10">
        <Flex
          px={"20px"}
          minWidth="max-content"
          alignItems={"center"}
          justifyContent={"space-between"}
          position="relative"
          style={{
            zIndex: 20,
          }}
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
            style={{ zIndex: 40 }}
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
          <Slide direction="top" in={isOpen} style={{ zIndex: 30 }}>
            <Box bg="#0a0d14" height="100vh">
              <Flex
                width={"100vw"}
                height={"100vh"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Center>
                  <Flex
                    onClick={() => setIsOpen(false)}
                    flexDirection="column"
                    alignItems="center"
                    gap="72px"
                  >
                    <Link to="/uncoming">
                      <Heading
                        as="h3"
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/uncoming" ? "50%" : ""}
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Lançamentos
                        <Divider
                          position={"absolute"}
                          left={pathname == "/uncoming" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={["2px", null, null, "3px"]}
                          rounded={"xl"}
                          width={
                            pathname == "/uncoming" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/best">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/best" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Melhores da Semana
                        <Divider
                          position={"absolute"}
                          left={pathname == "/best" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/latestView"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={pathname == "/best" ? "calc(100% + 20px)" : ""}
                        />
                      </Heading>
                    </Link>
                    <Link to="/category">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/category" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Categorias
                        <Divider
                          position={"absolute"}
                          left={pathname == "/categories" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/categories"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/categories" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/favorites">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/favorites" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Favoritos
                        <Divider
                          position={"absolute"}
                          left={pathname == "/favorites" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/favorites"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/favorites" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/latestView">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/best" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Assistir Mais Tarde
                        <Divider
                          position={"absolute"}
                          left={pathname == "/latestView" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/latestView"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/latestView" ? "calc(100% + 20px)" : ""
                          }
                        />
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
