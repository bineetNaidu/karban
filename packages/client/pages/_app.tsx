import Head from 'next/head';
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
} from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Karban | bineetnaidu.io</title>
      </Head>
      <main>
        <ChakraProvider resetCSS>
          <ColorModeScript initialColorMode="dark" />
          <ColorModeProvider
            options={{ initialColorMode: 'dark' }}
          ></ColorModeProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default MyApp;
