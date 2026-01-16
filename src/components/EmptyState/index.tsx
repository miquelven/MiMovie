import { Flex, Heading, Text, Icon, Button } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { TbMovieOff } from "react-icons/tb";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconType;
  actionText?: string;
  actionLink?: string;
}

export default function EmptyState({
  title,
  description,
  icon = TbMovieOff,
  actionText,
  actionLink,
}: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="400px"
      bg="#1c212e"
      borderRadius="16px"
      p={8}
      textAlign="center"
      gap={4}
      w="100%"
    >
      <Icon as={icon} boxSize={16} color="gray.500" mb={2} />
      <Heading as="h3" size="lg" color="white">
        {title}
      </Heading>
      {description && (
        <Text color="gray.400" maxW="md" fontSize="lg">
          {description}
        </Text>
      )}
      {actionText && actionLink && (
        <Button
          as={Link}
          to={actionLink}
          colorScheme="blue"
          variant="outline"
          mt={4}
          _hover={{ bg: "whiteAlpha.200" }}
        >
          {actionText}
        </Button>
      )}
    </Flex>
  );
}
