import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Products from "../components/home/Products";
import Loader from "../components/shared/Loader";
import { testConnection } from "../services/globalServices";
import { getAllProducts } from "../services/prodcutServices";

export default function Home({ networkError }) {
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
    isRefetching,
    refetch,
  } = useQuery("api/get-products", () => getAllProducts(), {
    staleTime: 1000 * 60 * 60,
  });

  if (networkError) {
    return (
      <>
        <Head>
          <title>پروشاپ - خطا</title>
        </Head>

        <Alert
          status="error"
          w="xl"
          p={4}
          rounded="xl"
          boxShadow="md"
          flexDir="column"
        >
          <AlertIcon boxSize={8} mb={2} />
          <AlertTitle fontSize="sm">خطا در برقراری ارتباط با سرور!</AlertTitle>
          <AlertDescription fontSize="sm">
            لطفا از اتصال اینترنت خود مطمئن شوید و یا با مدیر سایت ارتباط
            بگیرید.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>پروشاپ - خانه</title>
        <meta name="description" content="خانه" />
      </Head>

      {isLoading || isRefetching ? (
        <Loader />
      ) : (
        <Products products={products} />
      )}
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("api/test-connection", () =>
    testConnection()
  );

  const testResponse = queryClient.getQueryData("api/test-connection");

  if (testResponse.code && testResponse.code === "ECONNREFUSED") {
    return { props: { networkError: true } };
  } else {
    await queryClient.prefetchQuery("api/get-products", () => getAllProducts());
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      networkError: false,
    },
    revalidate: 30,
  };
}
