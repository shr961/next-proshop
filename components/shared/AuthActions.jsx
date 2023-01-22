import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function AuthActions({
  show = true,
  onClose = () => {},
  isMobile = false,
}) {
  const router = useRouter();

  const navigationTimeout = useCallback(
    (to = "") =>
      setTimeout(() => {
        router.push(to);
      }, 1000),
    [router]
  );

  useEffect(() => {
    return () => {
      clearTimeout(navigationTimeout);
    };
  }, [navigationTimeout]);

  return show ? (
    <ButtonGroup size="sm" colorScheme="brand" isAttached>
      <Button
        color="neutral.200"
        boxShadow="md"
        onClick={() => {
          onClose();

          if (isMobile) {
            navigationTimeout("/auth/login");
          } else {
            router.push("/auth/login");
          }
        }}
      >
        ورود
      </Button>
      <Button
        color="whiteAlpha.900"
        boxShadow="md"
        onClick={() => {
          onClose();

          if (isMobile) {
            navigationTimeout("/auth/register");
          } else {
            router.push("/auth/register");
          }
        }}
      >
        ثبت نام
      </Button>
    </ButtonGroup>
  ) : null;
}
