import Head from 'next/head';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../utils/ApolloClient';
import 'tailwindcss/tailwind.css';
import { StateContextProvider } from '../data/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Karban | bineetnaidu.io</title>
      </Head>
      <ApolloProvider client={client}>
        <main>
          <StateContextProvider>
            <Component {...pageProps} />
          </StateContextProvider>
        </main>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
