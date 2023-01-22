import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Icon,
  Heading,
  DrawerBody,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ShoppingCartContent from "./ShoppingCartContent";

export default function ShoppingCart({ isOpen, onClose }) {
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartIsEmpty(false);
    } else {
      setCartIsEmpty(true);
    }
  }, [cartItems.length]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      blockScrollOnMount
    >
      <DrawerOverlay />

      <DrawerContent
        w="90%"
        h="80vh"
        justifyContent="space-between"
        mx="auto"
        roundedBottom="xl"
      >
        <DrawerHeader
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          borderBottom="1px"
          borderColor="neutral.200"
        >
          <Heading
            fontSize="xl"
            bgGradient="linear(to-l, #00B5D8, #805AD5)"
            bgClip="text"
          >
            سبد خرید
          </Heading>
          <IconButton
            variant="ghost"
            onClick={onClose}
            pos="absolute"
            right={4}
          >
            <Icon
              as={HiSquares2X2}
              boxSize={6}
              color="pink.600"
              transform="rotate(45deg)"
            />
          </IconButton>
        </DrawerHeader>

        <DrawerBody
          display="flex"
          flexDir="column"
          justifyContent={cartIsEmpty ? "center" : "start"}
          alignItems="center"
          sx={{ "&": { roundedBottom: "xl", bg: "neutral.50" } }}
        >
          {cartIsEmpty ? (
            <Center
              bgGradient="linear(to-bl, cyan.400, indigo.400)"
              rounded="xl"
              p={3}
              boxShadow="lg"
              color="neutral.100"
            >
              <Text fontWeight="bold">سبد خرید شما خالیست!</Text>
            </Center>
          ) : (
            <ShoppingCartContent cartItems={cartItems} onClose={onClose} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
