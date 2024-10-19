import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../app/styles/globals.css';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}