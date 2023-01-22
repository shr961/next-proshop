import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Hypnosis } from "react-cssfx-loading";

export default function Loader() {
  return (
    <Modal isCentered isOpen>
      <ModalOverlay bg="blackAlpha.200" />
      <ModalContent bg="transparent" boxShadow="none" w="sm">
        <ModalBody display="flex" alignItems="center" justifyContent="center">
          <Hypnosis color="#00A3C4" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
