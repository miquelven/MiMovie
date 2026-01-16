import { Box, Button, Flex, Text } from "@chakra-ui/react";
import usePwaInstallPrompt from "../../../hooks/usePwaInstallPrompt";

export default function PwaInstallBanner() {
  const { isVisible, promptInstall, dismiss } = usePwaInstallPrompt();

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex={20}
      background="#1c212e"
      borderRadius="12px"
      px="24px"
      py="16px"
      boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
      maxW="480px"
      width="90%"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="16px">
        <Box>
          <Text fontWeight="bold" fontSize="md">
            Instale o MiMovies
          </Text>
          <Text fontSize="sm" color="#fff9">
            Adicione o MiMovies à tela inicial para uma experiência completa.
          </Text>
        </Box>
        <Flex gap="8px">
          <Button variant="outline" size="sm" onClick={dismiss}>
            Agora não
          </Button>
          <Button size="sm" colorScheme="blue" onClick={promptInstall}>
            Instalar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

