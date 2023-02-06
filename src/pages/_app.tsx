import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'swiper/css/bundle';
// import '../styles/bootstrap.css';xs
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
