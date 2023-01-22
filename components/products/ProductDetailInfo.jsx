import {
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

export default function ProductDetailInfo({
  name,
  description,
  countInStock,
  discount,
  price,
}) {
  const [isInStock] = useState(countInStock > 0);
  const [hasDiscount] = useState(discount > 0);

  let pricing;

  if (isInStock) {
    if (hasDiscount) {
      const discountedPrice = price - (price * discount) / 100;

      pricing = (
        <Wrap py={2}>
          <WrapItem>
            <Tag dir="ltr" colorScheme="emerald">
              <TagLabel>موجود در انبار</TagLabel>
              <TagRightIcon as={HiCheck} />
            </Tag>
          </WrapItem>

          <WrapItem>
            <HStack>
              <Tag colorScheme="rose" textDecor="line-through">
                <TagLabel>{price.toLocaleString("fa-IR")}</TagLabel>
              </Tag>

              <Tag colorScheme="emerald">
                <TagLabel>
                  {discountedPrice.toLocaleString("fa-IR")} تومان
                </TagLabel>
              </Tag>
            </HStack>
          </WrapItem>
        </Wrap>
      );
    } else {
      pricing = (
        <Wrap py={2}>
          <WrapItem>
            <Tag dir="ltr" colorScheme="emerald">
              <TagLabel>موجود در انبار</TagLabel>
              <TagRightIcon as={HiCheck} />
            </Tag>
          </WrapItem>

          <WrapItem>
            <Tag colorScheme="emerald">
              <TagLabel>{price.toLocaleString("fa-IR")} تومان</TagLabel>
            </Tag>
          </WrapItem>
        </Wrap>
      );
    }
  } else {
    pricing = (
      <Tag dir="ltr" colorScheme="rose">
        <TagLabel>اتمام موجودی</TagLabel>
        <TagRightIcon as={HiX} />
      </Tag>
    );
  }

  return (
    <VStack justify="start" align="start" spacing={{ base: 4, md: 6 }}>
      <Heading
        as="h2"
        fontSize={{ base: "sm", md: "md" }}
        bgGradient="linear(to-l, #00B5D8, #805AD5)"
        bgClip="text"
      >
        {name}
      </Heading>

      <Text fontSize={{ base: "xs", md: "sm" }} textAlign="justify">
        {description}
      </Text>

      {pricing}
    </VStack>
  );
}
