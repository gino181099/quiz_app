import "@/styles/globals.css";
import Provider from "../context/Context";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>Quiz</title>
        <link rel="icon" href="/next.svg" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
