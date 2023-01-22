import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function Search() {
  const [isMd] = useMediaQuery("(min-width: 48em)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialFocusRef = useRef();

  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: ({ search }) => {},
  });

  const { values } = formik;

  useEffect(() => {
    if (values.search.length >= 3) {
      onOpen();
    } else {
      onClose();
    }
  }, [onOpen, onClose, values.search]);

  return (
    <Popover
      matchWidth
      isOpen={isOpen}
      onClose={onClose}
      offset={isMd ? [0, 0] : [0, 8]}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        <Flex
          as="form"
          align="center"
          justify="center"
          w={{ base: "full", md: "40%" }}
        >
          <InputGroup size="md" maxW="xl">
            <InputRightElement>
              <Icon as={HiOutlineSearch} color="neutral.500" boxSize={6} />
            </InputRightElement>

            <Input
              variant="filled"
              name="search"
              placeholder="جستجو"
              inputMode="search"
              minLength={3}
              maxLength={21}
              value={formik.values.search}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              boxShadow="md"
              ref={initialFocusRef}
            />
          </InputGroup>
        </Flex>
      </PopoverTrigger>

      <PopoverContent rounded="xl" w="full" border="none" boxShadow="md">
        <PopoverBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="start"
          py={4}
        >
          <Text>نتیجه ای پیدا نشد!</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
