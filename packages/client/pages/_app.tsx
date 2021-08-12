import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Karban | bineetnaidu.io</title>
      </Head>
      <main>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default MyApp;
