import "leaflet/dist/leaflet.css";
import Head from "next/head";
import dynamic from "next/dynamic";

const ProviderClient = dynamic(() => import("../urql"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <ProviderClient>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </ProviderClient>
  );
}

export default MyApp;
