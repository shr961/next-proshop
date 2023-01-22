import { HStack, IconButton, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function ProductDetailToolbar() {
  return (
    <HStack w="full" justify="end" align="center" p={4}>
      <IconButton as={Link} href="/" colorScheme="purple" boxShadow="xl">
        <Icon as={HiChevronLeft} boxSize={{ base: 6, md: 7 }} />
      </IconButton>
    </HStack>
  );
}
