import Head from 'next/head';
import { StateContextProvider } from '../data/StateContext';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Karban | bineetnaidu.io</title>
      </Head>
      <main>
        <StateContextProvider>
          <Component {...pageProps} />
        </StateContextProvider>
      </main>
    </>
  );
}

export default MyApp;
