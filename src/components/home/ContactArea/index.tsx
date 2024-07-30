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
    <section className=" mb-40">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Heading as="h3" mb={4}>
            Entre em Contato
          </Heading>
          <Text mb={14} color="#23a7d7">
            Nos mande uma mensagem
          </Text>
          <Flex
            as="form"
            direction="column"
            width={{ base: "100%", md: "40%" }}
            boxShadow="lg"
            gap={6}
            p={8}
            rounded="md"
            bg="#0a0d14"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" placeholder="Seu nome" {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email} mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Seu email"
                {...register("email")}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="message" isInvalid={!!errors.message} mt={4}>
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                placeholder="Sua mensagem"
                {...register("message")}
                height={300}
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              mt={8}
              isLoading={isSubmitting}
              leftIcon={<EmailIcon />}
              background="white"
            >
              Email
            </Button>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
}
