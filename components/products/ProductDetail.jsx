import { Container, Flex, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import ProductDetailActions from "./ProductDetailActions";
import ProductDetailToolbar from "./ProductDetailToolbar";
import ProductDetailImage from "./ProductDetailImage";
import ProductDetailInfo from "./ProductDetailInfo";
import { useEffect, useState } from "react";

export default function ProductDetail({ product }) {
  const [productIsInCart, setProductIsInCart] = useState(false);
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  useEffect(() => {
    setProductIsInCart(cartItems.find((c) => c._id === product._id));
  }, [cartItems, product._id]);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        flexDir="column"
        justify="start"
        align="center"
        w="full"
        bg="neutral.50"
        rounded="xl"
        border="1px"
        borderColor="neutral.200"
        minH={500}
        boxShadow="md"
      >
        <ProductDetailToolbar />

        <Container maxW="container.xl" mt={4} h="full">
          <Flex
            w="full"
            h="full"
            justify="space-evenly"
            align="start"
            flexWrap="wrap"
          >
            <ProductDetailImage
              image={product.image}
              title={product.name}
              rating={product.rating}
              numReviews={product.numReviews}
            />

            <VStack
              w={{ base: "80%", md: "40%" }}
              h="full"
              my={{ base: 6, md: 0 }}
              align="start"
              spacing={{ base: 6, md: 12 }}
            >
              <ProductDetailInfo
                name={product.name}
                description={product.description}
                countInStock={product.countInStock}
                price={product.price}
                discount={product.discount}
              />

              <ProductDetailActions
                product={product}
                productIsInCart={productIsInCart}
              />
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </motion.div>
  );
}
