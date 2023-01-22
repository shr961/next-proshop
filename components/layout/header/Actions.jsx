import {
  HStack,
  IconButton,
  Icon,
  useDisclosure,
  useMediaQuery,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiShoppingBag, HiSquares2X2 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useLogoutUserMutation } from "../../../store/api";
import { logoutUser } from "../../../store/user-slice";
import MobileDrawer from "../../mobile/MobileDrawer";
import AuthActions from "../../shared/AuthActions";
import ShoppingCart from "../../shared/shopping-cart/ShoppingCart";
import UserActions from "../../shared/UserActions";
import ErrorToast from "../../shared/ErrorToast";
import InfoToast from "../../shared/InfoToast";
import { digitsEnToFa } from "@persian-tools/persian-tools";

export default function Actions() {
  const [cartIsEmpty, setCartIsEmpty] = useState(true);

  const userState = useSelector((state) => state.user);
  const { isLoggedIn, userData } = userState;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartIsEmpty(false);
    } else {
      setCartIsEmpty(true);
    }
  }, [cartItems.length]);

  const [
    mutateLogoutUser,
    {
      isError: isErrorLogout,
      isSuccess: isSuccessLogout,
      error: errorLogout,
      isLoading: isLoadingLogout,
      reset: resetLogoutMutation,
    },
  ] = useLogoutUserMutation();

  useEffect(() => {
    if (isErrorLogout) {
      toast({
        position: "top",
        render: () => (
          <ErrorToast
            message={
              errorLogout?.data?.message ||
              errorLogout?.message ||
              errorLogout?.error
            }
          />
        ),
      });

      resetLogoutMutation();
    }

    if (isSuccessLogout) {
      toast({
        position: "top",
        render: () => <InfoToast message="از حساب کاربری خارج شدید." />,
      });

      dispatch(logoutUser());
      router.replace("/");

      resetLogoutMutation();
    }
  }, [
    toast,
    isErrorLogout,
    errorLogout,
    isSuccessLogout,
    router,
    resetLogoutMutation,
    dispatch,
  ]);

  const {
    isOpen: isOpenMobileDrawer,
    onClose: onCloseMobileDrawer,
    onOpen: onOpenMobileDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenCart,
    onClose: onCloseCart,
    onOpen: onOpenCart,
  } = useDisclosure();

  const [isMd] = useMediaQuery("(min-width: 48em)");

  useEffect(() => {
    if (isMd) {
      onCloseMobileDrawer();
    }
  }, [isMd, onCloseMobileDrawer]);

  return (
    <>
      {!isMd && (
        <MobileDrawer
          isOpen={isOpenMobileDrawer}
          onClose={onCloseMobileDrawer}
          isLoggedIn={isLoggedIn}
          mutateLogoutUser={mutateLogoutUser}
          isLoadingLogout={isLoadingLogout}
          userData={userData}
        />
      )}
      <ShoppingCart isOpen={isOpenCart} onClose={onCloseCart} />

      <HStack w={{ base: "50%", md: "30%" }}>
        {!isMd && (
          <IconButton variant="ghost" onClick={onOpenMobileDrawer}>
            <Icon as={HiSquares2X2} boxSize={8} color="cyan.600" />
          </IconButton>
        )}

        <AuthActions show={isMd && !isLoggedIn} />
        <UserActions
          show={isMd && isLoggedIn}
          mutateLogoutUser={mutateLogoutUser}
          isLoadingLogout={isLoadingLogout}
        />

        <Box pos="relative">
          {!cartIsEmpty && (
            <Box
              pos="absolute"
              top={0.5}
              rounded="full"
              boxSize={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="brand.100"
              color="brand.700"
              zIndex={1}
              fontSize="xs"
              fontWeight="bold"
            >
              {digitsEnToFa(cartItems.length)}
            </Box>
          )}

          <IconButton variant="ghost" onClick={onOpenCart}>
            <Icon as={HiShoppingBag} boxSize={7} color="purple.500" />
          </IconButton>
        </Box>
      </HStack>
    </>
  );
}
