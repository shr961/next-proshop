import { useGetUserProfileQuery } from "../../store/api";
import { motion } from "framer-motion";
import { Divider, Flex, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Loader from "../../components/shared/Loader";
import EditProfileForm from "../../components/profile/EditProfileForm";
import Head from "next/head";
import ErrorToast from "../../components/shared/ErrorToast";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

export default function Profile() {
  const userState = useSelector((state) => state.user);
  const { isLoggedIn } = userState;

  const router = useRouter();
  const toast = useToast();

  const {
    isLoading,
    data,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch: refetchUserProfile,
  } = useGetUserProfileQuery(null, { skip: !isLoggedIn });

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isError) {
      toast({
        position: "top",
        render: () => (
          <ErrorToast
            message={error?.data?.message || error?.message || error?.error}
          />
        ),
      });
    }
  }, [isError, error, toast]);

  if (isLoading || isFetching) {
    return (
      <>
        <Head>
          <title>در حال بارگذاری حساب</title>
        </Head>

        <Loader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Head>
          <title>خطایی در بارگذاری حساب رخ داد!</title>
        </Head>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>پروفایل - {data?.name}</title>
      </Head>

      <motion.div
        style={{ width: "100%" }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          py={4}
          px={{ base: 4, md: 8 }}
          flexDir="column"
          justify="start"
          align="center"
          w={{ base: "90%", md: "70%", lg: "60%" }}
          bg="neutral.50"
          maxW="2xl"
          rounded="xl"
          boxShadow="md"
          border="1px"
          borderColor="neutral.300"
          minH={400}
          mx="auto"
        >
          <EditProfileForm
            userProfileData={data}
            refetchUserProfile={refetchUserProfile}
          />

          <Divider my={4} />

          <ChangePasswordForm />
        </Flex>
      </motion.div>
    </>
  );
}
