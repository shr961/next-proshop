import { Flex, Icon, Text } from "@chakra-ui/react";
import { HiXCircle } from "react-icons/hi";

export default function ErrorToast({ message }) {
  return (
    <Flex
      align="center"
      bgGradient="linear(to-bl, rose.300, rose.100)"
      rounded="xl"
      boxShadow="md"
      p={4}
    >
      <Icon as={HiXCircle} boxSize={6} color="rose.600" rounded="xl" ml={2} />
      <Text fontSize="sm">{message}</Text>
    </Flex>
  );
}
