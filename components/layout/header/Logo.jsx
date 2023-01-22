import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Logo() {
  return (
    <Flex justify="end" align="center" w={{ base: "50%", md: "30%" }}>
      <Link as={NextLink} href="/">
        <Text
          fontFamily="Haftad, sans-serif"
          fontSize={{ base: "3xl", lg: "4xl" }}
          bgGradient="linear(to-l, #00B5D8, #805AD5)"
          bgClip="text"
        >
          کارما
        </Text>
      </Link>
    </Flex>
  );
}
