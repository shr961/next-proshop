import { Flex, Text, Icon } from "@chakra-ui/react";
import { HiInformationCircle } from "react-icons/hi2";

export default function InfoToast({ message }) {
  return (
    <Flex
      align="center"
      bgGradient="linear(to-bl, cyan.300, cyan.100)"
      rounded="xl"
      boxShadow="md"
      p={4}
    >
      <Icon
        as={HiInformationCircle}
        boxSize={6}
        color="cyan.600"
        rounded="xl"
        ml={2}
      />
      <Text fontSize="sm">{message}</Text>
    </Flex>
  );
}
