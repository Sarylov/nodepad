import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#fff"
        startPosition={0.3}
        stopDelayMs={200}
        height={7}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
