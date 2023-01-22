import { Icon, HStack, Tag } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductDetailRating({ rating, numReviews }) {
  return (
    <Tag
      as={HStack}
      dir="ltr"
      spacing={1}
      pos="absolute"
      top={1}
      right={1}
      colorScheme="amber"
    >
      <Icon
        as={rating >= 1 ? FaStar : rating >= 0.5 ? FaStarHalfAlt : FaRegStar}
        boxSize={4}
        color="amber.500"
      />
      <Icon
        as={rating >= 2 ? FaStar : rating >= 1.5 ? FaStarHalfAlt : FaRegStar}
        boxSize={4}
        color="amber.500"
      />
      <Icon
        as={rating >= 3 ? FaStar : rating >= 2.5 ? FaStarHalfAlt : FaRegStar}
        boxSize={4}
        color="amber.500"
      />
      <Icon
        as={rating >= 4 ? FaStar : rating >= 3.5 ? FaStarHalfAlt : FaRegStar}
        boxSize={4}
        color="amber.500"
      />
      <Icon
        as={rating >= 5 ? FaStar : rating >= 4.5 ? FaStarHalfAlt : FaRegStar}
        boxSize={4}
        color="amber.500"
      />
    </Tag>
  );
}
