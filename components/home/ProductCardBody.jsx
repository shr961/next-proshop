import {
  Box,
  CardBody,
  HStack,
  Link as ChLink,
  Tag,
  TagLabel,
  useMediaQuery,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";

import ProductHoverActions from "./ProductHoverActions";

export default function ProductCardBody({
  id,
  image,
  name,
  brand,
  countInStock,
  discount,
  price,
  product,
  isInCart,
}) {
  const [productHasDiscount] = useState(discount > 0);
  const [productIsInStock] = useState(countInStock > 0);
  const [imageHovered, setImageHovered] = useState(false);

  const [isLg] = useMediaQuery("(min-width: 62em)");

  let priceTag;

  if (productIsInStock) {
    if (productHasDiscount) {
      const discountPrice = (price * discount) / 100;
      const discountedPrice = price - discountPrice;

      priceTag = (
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
      );
    } else {
      priceTag = (
        <WrapItem>
          <Tag colorScheme="emerald">
            <TagLabel>{price.toLocaleString("fa-IR")} تومان</TagLabel>
          </Tag>
        </WrapItem>
      );
    }
  } else {
    priceTag = (
      <WrapItem>
        <Tag colorScheme="rose">
          <TagLabel>اتمام موجودی</TagLabel>
        </Tag>
      </WrapItem>
    );
  }

  return (
    <CardBody
      borderRadius="xl"
      bg="neutral.50"
      border="1px"
      borderColor="neutral.300"
      boxShadow="md"
      mt={2}
      p={{ base: 4, sm: 2, md: 4 }}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="flex-start"
      position="relative"
    >
      <motion.div whileHover={{ scale: 1.025 }} transition={{ duration: 0.2 }}>
        <Box
          rounded="lg"
          overflow="hidden"
          position="relative"
          onMouseEnter={() => {
            setImageHovered(true);
          }}
          onMouseLeave={() => {
            setImageHovered(false);
          }}
        >
          {isLg && (
            <ProductHoverActions
              imageHovered={imageHovered}
              product={product}
              isInCart={isInCart}
            />
          )}

          <ChLink as={Link} href={`/products/${id}`}>
            <Image
              src={image}
              alt={name}
              style={{ objectFit: "cover" }}
              width={400}
              height={400}
            />
          </ChLink>

          {productIsInStock && productHasDiscount && (
            <Tag colorScheme="fuchsia" pos="absolute" top={2} right={2}>
              <TagLabel>{digitsEnToFa(discount)}% تخفیف</TagLabel>
            </Tag>
          )}
        </Box>
      </motion.div>

      {/* footer */}
      <Wrap as="footer" spacingY={4} w="full" py={2} mt={4}>
        {priceTag}

        <WrapItem>
          <Tag colorScheme="indigo">
            <TagLabel fontWeight="bold">{brand}</TagLabel>
          </Tag>
        </WrapItem>
      </Wrap>
    </CardBody>
  );
}
