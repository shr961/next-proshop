import {
  HStack,
  IconButton,
  Icon,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useCallback, useState } from "react";
import { HiMinus, HiOutlineBell, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";

import SuccessToast from "../shared/SuccessToast";
import InfoToast from "../shared/InfoToast";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";

export default function ProductDetailActions({ product, productIsInCart }) {
  const { countInStock } = product;

  const [isInStock] = useState(countInStock > 0);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const toast = useToast();

  const addItemToCartHandler = useCallback(() => {
    const newProduct = { ...product, qty: count };
    dispatch(addItemToCart(newProduct));

    toast({
      position: "top",
      render: () => <SuccessToast message="کالا به سبد خرید افزوده شد." />,
    });
  }, [dispatch, toast, product, count]);

  const removeItemFormCartHandler = useCallback(() => {
    dispatch(removeItemFromCart(product._id));

    toast({
      position: "top",
      render: () => <InfoToast message="کالا از سبد خرید حذف شد." />,
    });
  }, [dispatch, toast, product._id]);

  const incrementHandler = useCallback(() => {
    if (count === countInStock) {
      return;
    }

    setCount(count + 1);
  }, [count, countInStock]);

  const decrementHandler = useCallback(() => {
    if (count === 1) {
      return;
    }

    setCount(count - 1);
  }, [count]);

  let actions;

  if (isInStock) {
    actions = (
      <HStack w="full" spacing={1} justify={{ base: "center", sm: "start" }}>
        <IconButton
          variant="solid"
          size="sm"
          boxShadow="md"
          colorScheme="purple"
          onClick={incrementHandler}
          isDisabled={count === countInStock}
        >
          <Icon as={HiPlus} />
        </IconButton>

        <Input
          variant="outline"
          type="number"
          w={12}
          textAlign="center"
          inputMode="numeric"
          sx={{ "&": { paddingInline: 2 } }}
          size="sm"
          rounded="xl"
          value={digitsEnToFa(count)}
          min={1}
          max={countInStock}
          _focus={{ borderColor: "purple.400" }}
          readOnly
        />

        <IconButton
          variant="solid"
          boxShadow="md"
          size="sm"
          colorScheme="purple"
          onClick={decrementHandler}
          isDisabled={count === 1}
        >
          <Icon as={HiMinus} />
        </IconButton>

        <Button
          size="sm"
          colorScheme="brand"
          boxShadow="md"
          onClick={addItemToCartHandler}
        >
          افزودن
        </Button>

        {productIsInCart && (
          <Button
            size="sm"
            colorScheme="rose"
            boxShadow="md"
            onClick={removeItemFormCartHandler}
          >
            حذف از سبد
          </Button>
        )}
      </HStack>
    );
  } else {
    actions = (
      <HStack status="info" boxShadow="md" bg="amber.100" rounded="xl" p={2}>
        <IconButton variant="ghost" colorScheme="amber" size="sm">
          <Icon as={HiOutlineBell} boxSize={6} />
        </IconButton>

        <Text fontSize="sm" color="amber.800">
          موجود شد خبرم کن
        </Text>
      </HStack>
    );
  }

  return actions;
}
