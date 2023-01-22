import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  const { query, replace } = useRouter();
  const userState = useSelector((state) => state.user);
  const { isLoggedIn } = userState;

  const redirectQuery = query.redirect || "/";
  let willRedirect = false;

  if (query.redirect) {
    willRedirect = true;
  }

  useEffect(() => {
    if (isLoggedIn) {
      replace(redirectQuery);
    }
  }, [isLoggedIn, redirectQuery, replace]);

  return (
    <Flex
      py={4}
      px={{ base: 4, md: 8 }}
      flexDir="column"
      justify="center"
      align="center"
      w={{ base: "90%", md: "70%", lg: "60%" }}
      bg="neutral.50"
      maxW="2xl"
      rounded="xl"
      boxShadow="md"
      border="1px"
      borderColor="neutral.300"
      minH={400}
    >
      <RegisterForm redirectQuery={redirectQuery} willRedirect={willRedirect} />
    </Flex>
  );
}
