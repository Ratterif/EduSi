import NextApp, { AppProps } from 'next/app';

export default ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);
