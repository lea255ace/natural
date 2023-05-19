import { ConfigProvider } from "../context/configProvider";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
