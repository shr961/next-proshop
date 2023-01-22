import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import Nav from "../navigation/Nav";
import Actions from "./Actions";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
  const [isMd] = useMediaQuery("(min-width: 48em)");

  return (
    <Box
      bg="neutral.50"
      borderRadius="xl"
      position="fixed"
      insetX={4}
      top={4}
      pb={{ base: 4, md: 2 }}
      boxShadow="md"
      zIndex={1000}
      border="1px"
      borderColor="neutral.200"
    >
      <Container
        maxW="container.xl"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Flex as="header" w="full" h={16}>
          {/* ACTIONS  */}
          <Actions />

          {/* SEARCH */}
          {isMd && <Search />}

          {/* LOGO */}
          <Logo />
        </Flex>

        {isMd && <Nav />}
        {!isMd && <Search />}
      </Container>
    </Box>
  );
}
