import '../styles/globals.css';
import Layout from '../components/Layout'
import type { AppProps } from 'next/app';
import Router from 'next/router';

import { useEffect } from 'react';
import { UseSession } from '../hooks/useSession'

import Nprogress from 'nprogress';
import "nprogress/nprogress.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => Nprogress.start();
    const handleRouteDone = () => Nprogress.done();
 
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
 
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <UseSession>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UseSession>
  )
}
