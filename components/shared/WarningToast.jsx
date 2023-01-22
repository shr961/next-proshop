import { Flex, Text, Icon } from "@chakra-ui/react";
import { HiExclamationCircle } from "react-icons/hi";

export default function WarningToast({ message }) {
  return (
    <Flex
      align="center"
      bgGradient="linear(to-bl, amber.300, amber.100)"
      rounded="xl"
      boxShadow="md"
      p={4}
    >
      <Icon
        as={HiExclamationCircle}
        boxSize={6}
        color="amber.600"
        rounded="xl"
        ml={2}
      />
      <Text fontSize="sm">{message}</Text>
    </Flex>
  );
}
