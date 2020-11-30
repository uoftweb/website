import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../lib/apolloClient";

NProgress.configure({ showSpinner: false, parent: "#site-header" });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      50: "#dfeeff",
      100: "#b0cbff",
      200: "#7ea8ff",
      300: "#4b86ff",
      400: "#1a63ff",
      500: "#004ae6",
      600: "#0039b4",
      700: "#002982",
      800: "#001951",
      900: "#000821",
    },
    accent: {
      50: "#e1ffec",
      100: "#b8f6d1",
      200: "#8fefb4",
      300: "#64e898",
      400: "#3ae17c",
      500: "#23c862",
      600: "#179b4c",
      700: "#0c6f35",
      800: "#03431e",
      900: "#001806",
    },
  },
  fonts: {
    ...theme.fonts,
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
    mono: "'Fira Code', Menlo, monospace",
  },
  radii: {
    ...theme.radii,
    xl: "1.0rem",
    "2xl": "2.0rem",
    "3xl": "3.0rem",
  },
};

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
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
        <title>UofT Web Development Club</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider session={pageProps.session}>
          <ChakraProvider theme={customTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
