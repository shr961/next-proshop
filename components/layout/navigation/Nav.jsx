import { HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export default function Nav() {
  return (
    <HStack as="nav" justify="center" align="center" h={8} w="lg">
      <Menu placement="bottom">
        <MenuButton fontSize="sm">فروشگاه</MenuButton>

        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
