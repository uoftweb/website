import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Provider as AuthProvider } from "next-auth/client";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeProvider>
        <CSSReset />
        <Head>
          <title>UofT Web Development Club</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
