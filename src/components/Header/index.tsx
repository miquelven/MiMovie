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
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  // hidden scrollbar
  useEffect(() => {
    if (isOpen) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <header className="relative">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="absolute"
        left="0"
        right="0"
        top="0"
        mt="40px"
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          position="relative"
          style={{
            zIndex: 20,
          }}
        >
          <Link to="/">
            <Heading as="h1" size={["xs", null, null, "lg"]} color="#c7c7c7">
              MiMovies
            </Heading>
          </Link>
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
                right="0"
              />
            </Fade>
          </Button>
          <Slide direction="top" in={isOpen} style={{ zIndex: 30 }}>
            <Box bg="#0a0d14" height="100vh">
              <Flex
                width={"100%"}
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
                    <Link to="/populares">
                      <Heading
                        as="h3"
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/populares" ? "50%" : ""}
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Populares
                        <Divider
                          position={"absolute"}
                          zIndex={50}
                          left={pathname == "/populares" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={["2px", null, null, "3px"]}
                          rounded={"xl"}
                          width={
                            pathname == "/populares" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/melhores">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/melhores" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Melhores da Semana
                        <Divider
                          position={"absolute"}
                          left={pathname == "/melhores" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/assistirMaisTarde"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/melhores" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/categorias">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/categorias" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Categorias
                        <Divider
                          position={"absolute"}
                          left={pathname == "/categorias" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/categorias"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/categorias" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/favoritos">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/favoritos" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Favoritos
                        <Divider
                          position={"absolute"}
                          left={pathname == "/favoritos" ? "-12px" : "-100vw"}
                          top="50%"
                          borderWidth={
                            pathname == "/favoritos"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/favoritos" ? "calc(100% + 20px)" : ""
                          }
                        />
                      </Heading>
                    </Link>
                    <Link to="/assistirMaisTarde">
                      <Heading
                        transition={"all ease-in-out 250ms"}
                        _hover={{ opacity: "50%" }}
                        position={"relative"}
                        opacity={pathname == "/assistirMaisTarde" ? "50%" : ""}
                        as="h3"
                        fontSize={["24px", null, null, "30px"]}
                      >
                        Assistir Mais Tarde
                        <Divider
                          position={"absolute"}
                          left={
                            pathname == "/assistirMaisTarde"
                              ? "-12px"
                              : "-100vw"
                          }
                          top="50%"
                          borderWidth={
                            pathname == "/assistirMaisTarde"
                              ? ["2px", null, null, "3px"]
                              : ""
                          }
                          rounded={"xl"}
                          width={
                            pathname == "/assistirMaisTarde"
                              ? "calc(100% + 20px)"
                              : ""
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
      </Container>
    </header>
  );
}
