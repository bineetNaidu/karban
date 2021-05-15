import Head from 'next/head';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../utils/ApolloClient';
import 'tailwindcss/tailwind.css';
import StateProvider from '../data/State.context';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Karban | bineetnaidu.io</title>
      </Head>
      <main>
        <ApolloProvider client={client}>
          <StateProvider>
            <Component {...pageProps} />
          </StateProvider>
        </ApolloProvider>
      </main>
    </>
  );
}

export default MyApp;
