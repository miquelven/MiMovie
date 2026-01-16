import {
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EmailIcon } from "@chakra-ui/icons";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const MotionFlex = motion(Flex);

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  message: yup.string().required("Mensagem é obrigatória"),
});

export default function ContactArea() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const sendEmail = (data: IFormInput) => {
    const templateParams = {
      message: data.message,
      email: data.email,
    };

    emailjs.send(
      "service_j9fygzm",
      "template_el44meo",
      templateParams,
      "W7PLvOdvqRzXPUDr1"
    );
  };

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    if (values !== null) {
      sendEmail(values);
      toast.success("Email enviado!");
    }
  };

  return (
    <section className="relative w-full py-32 max-sm:py-24 bg-[#050509]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[#23a7d7]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-80 w-80 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
        zIndex={10}
      >
        <Flex
          justifyContent={{ base: "center", lg: "space-between" }}
          alignItems={{ base: "flex-start", lg: "stretch" }}
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "40px", lg: "80px" }}
        >
          <Flex
            flex="1"
            flexDir="column"
            justifyContent="center"
            maxW={{ base: "100%", lg: "520px" }}
          >
            <Text
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="#23a7d7"
              mb={4}
              fontWeight="semibold"
            >
              Contato
            </Text>
            <Heading
              as="h3"
              fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
              mb={4}
            >
              Entre em Contato
            </Heading>
            <Text
              color="#fff9"
              fontSize={{ base: "sm", md: "md" }}
              lineHeight={{ base: "22px", md: "28px" }}
              maxW="520px"
              mb={6}
            >
              Nos mande uma mensagem com suas dúvidas, sugestões ou feedbacks
              sobre o MiMovies. Vamos responder o mais rápido possível.
            </Text>
            <Text
              color="#a1a1aa"
              fontSize={{ base: "xs", md: "sm" }}
              lineHeight={{ base: "20px", md: "24px" }}
              maxW="440px"
            >
              Preencha os campos ao lado e envie seu email para que possamos
              continuar essa conversa.
            </Text>
          </Flex>

          <MotionFlex
            as="form"
            flex="1"
            maxW={{ base: "100%", lg: "520px" }}
            direction="column"
            boxShadow="0 24px 70px rgba(5, 5, 9, 0.95)"
            gap={6}
            p={{ base: 6, md: 8 }}
            rounded="3xl"
            bg="rgba(15,23,42,0.96)"
            borderWidth="1px"
            borderColor="#23a7d799"
            backdropFilter="blur(18px)"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Seu nome"
                {...register("name")}
                variant="filled"
                bg="#020617"
                borderColor="#1f2937"
                _hover={{ bg: "#020617" }}
                _focus={{
                  bg: "#020617",
                  borderColor: "#23a7d7",
                  boxShadow: "0 0 0 1px #23a7d7",
                }}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Seu email"
                {...register("email")}
                variant="filled"
                bg="#020617"
                borderColor="#1f2937"
                _hover={{ bg: "#020617" }}
                _focus={{
                  bg: "#020617",
                  borderColor: "#23a7d7",
                  boxShadow: "0 0 0 1px #23a7d7",
                }}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="message" isInvalid={!!errors.message}>
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                placeholder="Sua mensagem"
                {...register("message")}
                height={260}
                variant="filled"
                bg="#020617"
                borderColor="#1f2937"
                _hover={{ bg: "#020617" }}
                _focus={{
                  bg: "#020617",
                  borderColor: "#23a7d7",
                  boxShadow: "0 0 0 1px #23a7d7",
                }}
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              leftIcon={<EmailIcon />}
              bg="#23a7d7"
              color="#0a0d14"
              fontWeight="semibold"
              _hover={{
                bg: "#1f9bc9",
                transform: "translateY(-1px)",
                boxShadow: "0 18px 45px rgba(8, 47, 73, 0.8)",
              }}
              _active={{ bg: "#1a88b0", transform: "translateY(0)" }}
            >
              Enviar email
            </Button>
          </MotionFlex>
        </Flex>
      </Container>
    </section>
  );
}
