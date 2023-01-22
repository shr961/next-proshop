import { HStack, IconButton, Icon, useToast } from "@chakra-ui/react";
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

export default function ProductMobileActions({ isInCart, product }) {
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
    <HStack spacing={4} w="full" justify="center">
      <IconButton
        variant="ghost"
        colorScheme="rose"
        size="sm"
        onClick={toggleFavoriteHandler}
      >
        <Icon
          as={isFavorite ? HiHeart : HiOutlineHeart}
          boxSize={6}
          color="rose.600"
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
  );
}
