import { Container, Flex } from "@chakra-ui/react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <Container
        as="main"
        maxW="container.xl"
        mt={[36, null, 32]}
        mb={12}
        pt={4}
        pb={8}
        display="flex"
        justifyContent="center"
      >
        {children}
      </Container>

      <Footer />
    </>
  );
}
