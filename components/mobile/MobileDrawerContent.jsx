import {
  HStack,
  List,
  ListItem,
  Text,
  Link as ChLink,
  VStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

export default function MobileDrawerContent({
  name = "",
  onClose,
  isLoggedIn,
}) {
  return isLoggedIn ? (
    <VStack w="full" align="start" spacing={6} h="full">
      <HStack>
        <Text fontSize="sm">سلام</Text>

        <Text color="brand.600" fontSize="sm" fontWeight="bold" ms={2}>
          {name}
        </Text>
      </HStack>

      <HStack spacing={2}>
        <ChLink
          as={Link}
          href="/profile"
          fontSize="sm"
          onClick={() => {
            onClose();
          }}
        >
          <Button size="sm" variant="outline" colorScheme="brand">
            پروفایل
          </Button>
        </ChLink>

        <ChLink
          as={Link}
          href="/orders"
          fontSize="sm"
          onClick={() => {
            onClose();
          }}
        >
          <Button size="sm" variant="outline" colorScheme="purple">
            سفارش ها
          </Button>
        </ChLink>
      </HStack>
    </VStack>
  ) : null;
}
