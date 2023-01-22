import { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";

import useRouteState from "../hooks/useRouteState";
import Layout from "../components/layout/Layout";
import store from "../store/store";
import theme from "../styles/theme";
import Loader from "../components/shared/Loader";

import "../styles/global.css";
import Head from "next/head";
import { testConnection } from "../services/globalServices";

export default function App({ Component, pageProps, status }) {
  const [queryClient] = useState(() => new QueryClient());

  // const { isError, isSuccess, data } = useQuery(
  //   "/api/test-connection",
  //   () => testConnection(),
  //   {}
  // );

  const { isChanging } = useRouteState();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <ChakraProvider theme={theme} resetCSS>
            <Layout>
              <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <meta
                  name="description"
                  content="فروشگاه آنلاین پروشاپ"
                  key="g-1"
                />
                <meta
                  name="description"
                  content="خرید انواع کالای دیجیتال"
                  key="g-2"
                />
              </Head>

              {isChanging ? (
                <>
                  <Head>
                    <title>پروشاپ</title>
                  </Head>
                  <Loader />
                </>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ChakraProvider>
        </ReduxProvider>

        <Box dir="ltr">
          <ReactQueryDevtools initialIsOpen={false} />
        </Box>
      </Hydrate>
    </QueryClientProvider>
  );
}
