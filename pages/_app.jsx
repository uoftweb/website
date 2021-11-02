import React from "react";
import "focus-visible/dist/focus-visible";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ApolloProvider } from "@apollo/client";

import { DefaultSeo } from "next-seo";
import { useApollo } from "../lib/apolloClient";
import theme from "../theme";
import { siteConfig } from "../configs/site";

NProgress.configure({ showSpinner: false, parent: "#site-header" });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <DefaultSeo
        titleTemplate={siteConfig.titleTemplate}
        description={siteConfig.description}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: siteConfig.url,
          site_name: siteConfig.siteName,
          images: siteConfig.images,
        }}
      />
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider session={pageProps.session}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
