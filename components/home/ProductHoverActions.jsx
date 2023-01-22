import { Box, IconButton, Icon, HStack, useToast } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiShoppingBag,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

import SuccessToast from "../shared/SuccessToast";
import InfoToast from "../shared/InfoToast";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";

export default function ProductHoverActions({
  imageHovered,
  isInCart,
  product,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    if (isFavorite) {
      setIsFavorite(false);
      toast({
        position: "top",
        render: () => <InfoToast message="کالا از علاقه مندی ها حذف شد." />,
      });
    } else {
      setIsFavorite(true);
      toast({
        position: "top",
        render: () => (
          <SuccessToast message="کالا به علاقه مندی ها افزوده شد." />
        ),
      });
    }
  }, [isFavorite, toast]);

  const addItemToCartHandler = useCallback(() => {
    const newProduct = { ...product, qty: 1 };
    dispatch(addItemToCart(newProduct));

    toast({
      position: "top",
      render: () => <SuccessToast message="کالا به سبد خرید افزوده شد." />,
    });
  }, [dispatch, toast, product]);

  const removeItemFormCartHandler = useCallback(() => {
    dispatch(removeItemFromCart(product._id));

    toast({
      position: "top",
      render: () => <InfoToast message="کالا از سبد خرید حذف شد." />,
    });
  }, [dispatch, toast, product._id]);

  return (
    <AnimatePresence>
      {imageHovered && (
        <Box pos="absolute" top={1} left={1}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HStack spacing={1} p={0} rounded="xl" bg="transparent">
              <IconButton
                variant="ghost"
                colorScheme="pink"
                size="sm"
                onClick={toggleFavoriteHandler}
              >
                <Icon
                  as={isFavorite ? HiHeart : HiOutlineHeart}
                  boxSize={6}
                  color="pink.500"
                />
              </IconButton>

              <IconButton
                variant="ghost"
                colorScheme="purple"
                size="sm"
                onClick={() => {
                  if (isInCart) {
                    removeItemFormCartHandler();
                  } else {
                    addItemToCartHandler();
                  }
                }}
              >
                <Icon
                  as={isInCart ? HiShoppingBag : HiOutlineShoppingBag}
                  boxSize={6}
                  color="purple.600"
                />
              </IconButton>
            </HStack>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}
