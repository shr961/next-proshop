import { CardFooter } from "@chakra-ui/react";
import ProductMobileActions from "./ProductMobileActions";

export default function ProductCardFooter({ product, isInCart }) {
  return (
    <CardFooter
      bg="neutral.50"
      boxShadow="md"
      rounded="xl"
      userSelect="none"
      alignItems="center"
      border="1px"
      borderColor="neutral.300"
      p={1}
      h={12}
      mt={1}
    >
      <ProductMobileActions isInCart={isInCart} product={product} />
    </CardFooter>
  );
}
