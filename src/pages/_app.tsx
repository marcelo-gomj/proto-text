import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { supabase } from '../services/supabase';
import { UseSession } from '../hooks/useSession'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseSession>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UseSession>
  )
}
