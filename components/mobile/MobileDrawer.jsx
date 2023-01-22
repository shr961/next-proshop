import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { HiSquares2X2 } from "react-icons/hi2";
import AuthActions from "../shared/AuthActions";
import MobileDrawerContent from "./MobileDrawerContent";

export default function MobileDrawer({
  isOpen,
  onClose,
  isLoggedIn,
  mutateLogoutUser,
  isLoadingLogout,
  userData,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      blockScrollOnMount
    >
      <DrawerOverlay />
      <DrawerContent w="90%" minH="50vh" mx="auto" roundedBottom="xl">
        <DrawerHeader p={2} borderBottom="1px" borderColor="neutral.200">
          <HStack>
            <IconButton
              variant="ghost"
              onClick={onClose}
              display={{ base: "flex", md: "none" }}
            >
              <Icon
                as={HiSquares2X2}
                boxSize={6}
                color="pink.600"
                transform="rotate(45deg)"
              />
            </IconButton>

            <AuthActions show={!isLoggedIn} onClose={onClose} isMobile />
          </HStack>
        </DrawerHeader>

        <DrawerBody
          py={4}
          px={8}
          h="full"
          sx={{ "&": { bg: "neutral.50", roundedBottom: "xl" } }}
        >
          <MobileDrawerContent
            name={userData?.name || ""}
            onClose={onClose}
            isLoggedIn={isLoggedIn}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
