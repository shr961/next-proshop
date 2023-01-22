import { Flex } from "@chakra-ui/react";
import Image from "next/image";

import ProductDetailRating from "./ProductDetailRating";

export default function ProductDetailImage({
  image,
  title,
  numReviews,
  rating,
}) {
  return (
    <Flex
      justify="start"
      align="center"
      pos="relative"
      w={{ base: "80%", md: "40%" }}
    >
      <ProductDetailRating rating={rating} numReviews={numReviews} />

      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        style={{ borderRadius: "12px" }}
      />
    </Flex>
  );
}
