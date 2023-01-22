import { HStack, IconButton, Icon, Box, useToast } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiShoppingBag,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { InfoToast, SuccessToast } from "../shared/Toasts";

export const MobileActions = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false); // initial state will be cart context value of this product

  const toast = useToast();

  useEffect(() => {
    if (isFavorite) {
      toast({
        position: "top",
        render: () => (
          <SuccessToast message="کالا به علاقه مندی ها افزوده شد." />
        ),
      });
    } else {
      toast({
        position: "top",
        render: () => <InfoToast message="کالا از علاقه مندی ها حذف شد." />,
      });
    }

    if (isInCart) {
      toast({
        position: "top",
        render: () => <SuccessToast message="کالا به سبد خرید افزوده شد." />,
      });
    } else {
      toast({
        position: "top",
        render: () => <InfoToast message="کالا از سبد خرید حذف شد." />,
      });
    }
  }, [isInCart, toast, isFavorite]);

  return (
    <HStack
      spacing={4}
      rounded="xl"
      mt={1}
      py={1}
      w="full"
      bg="neutral.100"
      justify="center"
    >
      {isFavorite ? (
        <IconButton
          variant="ghost"
          colorScheme="rose"
          size="sm"
          onClick={() => setIsFavorite(false)}
        >
          <Icon as={HiHeart} boxSize={7} color="rose.600" />
        </IconButton>
      ) : (
        <IconButton
          variant="ghost"
          colorScheme="rose"
          size="sm"
          onClick={() => setIsFavorite(true)}
        >
          <Icon as={HiOutlineHeart} boxSize={7} color="rose.600" />
        </IconButton>
      )}

      {isInCart ? (
        <IconButton
          variant="ghost"
          colorScheme="purple"
          size="sm"
          onClick={() => setIsInCart(false)}
        >
          <Icon as={HiShoppingBag} boxSize={7} color="purple.600" />
        </IconButton>
      ) : (
        <IconButton
          variant="ghost"
          colorScheme="purple"
          size="sm"
          onClick={() => setIsInCart(true)}
        >
          <Icon as={HiOutlineShoppingBag} boxSize={7} color="purple.600" />
        </IconButton>
      )}
    </HStack>
  );
};
