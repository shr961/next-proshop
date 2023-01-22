import { Divider, SimpleGrid } from "@chakra-ui/react";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCartContent({ cartItems, onClose }) {
  return (
    <SimpleGrid
      w="full"
      columns={[1, null, 2, 3, 4]}
      spacingX={[0, 12, 4]}
      spacingY={4}
    >
      {cartItems.map((item) => (
        <ShoppingCartItem key={item._id} item={item} onClose={onClose} />
      ))}

      <Divider />
    </SimpleGrid>
  );
}
