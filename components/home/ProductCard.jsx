import { Card, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCardBody from "./ProductCardBody";
import ProductCardFooter from "./ProductCardFooter";
import ProductCardHeader from "./ProductCardHeader";

export default function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);
  const [isLg] = useMediaQuery("(min-width: 62em)");

  const { name, _id, image, brand, countInStock, discount, price } = product;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  useEffect(() => {
    const productIsInCart = cartItems.find((c) => c._id === product._id);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartItems, product._id]);

  return (
    <Card
      boxShadow="none"
      w={{ base: "90%", sm: "90%", lg: "full" }}
      justifySelf="center"
      color="neutral.600"
    >
      {/* card header */}
      <ProductCardHeader name={name} id={_id} />

      {/* card body */}
      <ProductCardBody
        id={_id}
        image={image}
        name={name}
        brand={brand}
        countInStock={countInStock}
        discount={discount}
        price={price}
        product={product}
        isInCart={isInCart}
      />

      {!isLg && <ProductCardFooter isInCart={isInCart} product={product} />}
    </Card>
  );
}
