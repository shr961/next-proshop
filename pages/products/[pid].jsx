import { useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

import ProductDetail from "../../components/products/ProductDetail";
import ErrorToast from "../../components/shared/ErrorToast";
import Loader from "../../components/shared/Loader";
import { getAllProducts, getProductById } from "../../services/prodcutServices";

export default function Product() {
  const { query } = useRouter();
  const toast = useToast();

  const {
    data: product,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery("api/get-product-by-id", () => getProductById(query.pid), {
    staleTime: 1000 * 60 * 60,
  });

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
  }, [error, isError, toast]);

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>

      {isLoading ? <Loader /> : <ProductDetail product={product} />}
    </>
  );
}

export async function getStaticProps(context) {
  const queryClient = new QueryClient();

  const {
    params: { pid },
  } = context;

  await queryClient.prefetchQuery("api/get-product-by-id", () =>
    getProductById(pid)
  );

  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("api/get-products", () => getAllProducts());

  const products = queryClient.getQueryData();

  const paths = products.map((p) => ({
    params: {
      pid: p._id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
