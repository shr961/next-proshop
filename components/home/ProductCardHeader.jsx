import { CardHeader, Heading, Link as ChLink } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductCardHeader({ name, id }) {
  return (
    <CardHeader
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="xl"
      boxShadow="md"
      h={10}
      bgGradient="linear(to-bl, cyan.400, indigo.400)"
      color="neutral.100"
    >
      <ChLink as={Link} href={`/products/${id}`}>
        <Heading as="h3" fontSize={{ base: "xs", md: "sm" }}>
          {name}
        </Heading>
      </ChLink>
    </CardHeader>
  );
}
