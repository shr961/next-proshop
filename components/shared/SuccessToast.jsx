import { Flex, Icon, Text } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";

export default function SuccessToast({ message }) {
  return (
    <Flex
      align="center"
      bgGradient="linear(to-bl, emerald.300, emerald.100)"
      rounded="xl"
      boxShadow="md"
      p={4}
    >
      <Icon
        as={HiCheckCircle}
        boxSize={6}
        color="emerald.600"
        rounded="xl"
        ml={2}
      />
      <Text fontSize="sm">{message}</Text>
    </Flex>
  );
}
