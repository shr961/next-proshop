import {
  Box,
  Container,
  Flex,
  Text,
  Icon,
  HStack,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      bg="neutral.50"
      borderRadius="lg"
      position="fixed"
      insetX={0}
      bottom={0}
      borderTop="1px"
      borderColor="neutral.200"
    >
      <Container maxW="container.xl">
        <Flex as="footer" h={16} justify="center" align="center">
          <HStack>
            <Link href="https://www.github.com" target="_blank">
              <IconButton variant="ghost">
                <Icon as={FaGithub} boxSize={6} color="blackAlpha.800" />
              </IconButton>
            </Link>
            <Text color="gray.600">samieehr961@protonmail.com</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
