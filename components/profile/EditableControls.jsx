import {
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";
import { HiCheck, HiX, HiPencil } from "react-icons/hi";

export default function EditableControls() {
  const {
    isEditing,
    getCancelButtonProps,
    getEditButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return (
    <Flex display="inline-flex" justify="center" align="center">
      {isEditing ? (
        <ButtonGroup>
          <IconButton
            {...getSubmitButtonProps()}
            size="sm"
            colorScheme="emerald"
          >
            <Icon as={HiCheck} boxSize={4} />
          </IconButton>
          <IconButton {...getCancelButtonProps()} size="sm" colorScheme="rose">
            <Icon as={HiX} boxSize={4} />
          </IconButton>
        </ButtonGroup>
      ) : (
        <IconButton {...getEditButtonProps()} size="sm" colorScheme="amber">
          <Icon as={HiPencil} boxSize={4} />
        </IconButton>
      )}
    </Flex>
  );
}
