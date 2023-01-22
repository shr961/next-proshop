import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

export default function Products({ products }) {
  return (
    <VStack w="full">
      <Heading
        as="h2"
        userSelect="none"
        fontSize={["xl", null, "2xl"]}
        bgGradient="linear(to-l, #00B5D8, #805AD5)"
        bgClip="text"
      >
        محصولات
      </Heading>

      <SimpleGrid
        w="90%"
        columns={[1, 2, null, 3, 4]}
        spacingX={[0, 1, null, 4]}
        spacingY={4}
        pt={5}
        pb={10}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
