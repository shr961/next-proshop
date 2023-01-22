import {
  IconButton,
  Input,
  VStack,
  Link as ChLink,
  Icon,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useToast,
  Tag,
  Wrap,
  WrapItem,
  TagLabel,
  Flex,
  Box,
} from "@chakra-ui/react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";

import {
  removeItemFromCart,
  updateCartItemQty,
} from "../../../store/cart-slice";
import InfoToast from "../InfoToast";

export default function ShoppingCartItem({ item, onClose }) {
  const [count, setCount] = useState(item.qty);
  const [hasDiscount, setHasDiscount] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const incrementHandler = useCallback(() => {
    if (count === item.countInStock) {
      return;
    }
    setCount(count + 1);
  }, [count, item.countInStock]);

  const decrementHandler = useCallback(() => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }, [count]);

  const removeItemHandler = useCallback(() => {
    dispatch(removeItemFromCart(item._id));

    toast({
      position: "top",
      render: () => <InfoToast message="کالا از سبد خرید حذف شد." />,
    });
  }, [dispatch, toast, item._id]);

  useEffect(() => {
    dispatch(updateCartItemQty({ itemId: item._id, qty: count }));
  }, [dispatch, item._id, count]);

  useEffect(() => {
    setHasDiscount(item.discount > 0);
  }, [item.discount]);

  let pricing;

  if (hasDiscount) {
    const discountPrice = (item.price * item.discount) / 100;
    const discountedPrice = item.price - discountPrice;

    pricing = (
      <WrapItem>
        <HStack>
          <Tag colorScheme="rose" textDecor="line-through">
            <TagLabel>{item.price.toLocaleString("fa-IR")}</TagLabel>
          </Tag>

          <Tag colorScheme="emerald">
            <TagLabel>{discountedPrice.toLocaleString("fa-IR")} تومان</TagLabel>
          </Tag>
        </HStack>
      </WrapItem>
    );
  } else {
    pricing = (
      <WrapItem>
        <Tag colorScheme="emerald">
          <TagLabel>{item.price.toLocaleString("fa-IR")}</TagLabel>
        </Tag>
      </WrapItem>
    );
  }

  return (
    <Card
      rounded="xl"
      w={{ base: "90%", sm: "70%", md: "90%" }}
      justifySelf={{ base: "center", md: "start" }}
    >
      <CardHeader display="flex" justifyContent="start" alignItems="center">
        <Box pos="relative">
          {hasDiscount && (
            <Tag colorScheme="fuchsia" pos="absolute" top={1} right={1}>
              <TagLabel>{digitsEnToFa(item.discount)}% تخفیف</TagLabel>
            </Tag>
          )}

          <Image
            src={item.image}
            alt={item.name}
            width={150}
            height={150}
            style={{ borderRadius: "12px", objectFit: "cover" }}
          />
        </Box>
      </CardHeader>

      <CardBody py={2}>
        <VStack py={1} align="start">
          <ChLink
            as={Link}
            href={`/product/${item._id}`}
            onClick={onClose}
            fontSize="sm"
            textAlign={{ base: "center", sm: "right" }}
            bgGradient="linear(to-l, #00B5D8, #805AD5)"
            bgClip="text"
          >
            {item.name}
          </ChLink>

          <Wrap w="full" spacing={4} py={2}>
            {pricing}
          </Wrap>
        </VStack>
      </CardBody>

      <CardFooter py={2}>
        <HStack w="full" justify="center">
          <IconButton
            variant="solid"
            size="sm"
            boxShadow="md"
            colorScheme="purple"
            onClick={incrementHandler}
            isDisabled={count === item.countInStock}
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
            max={item.countInStock}
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

          <IconButton
            variant="solid"
            boxShadow="md"
            size="sm"
            colorScheme="rose"
            onClick={removeItemHandler}
          >
            <Icon as={HiTrash} boxSize={6} />
          </IconButton>
        </HStack>
      </CardFooter>
    </Card>
  );
}
