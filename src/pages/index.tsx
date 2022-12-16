import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../services/supabase';

import AddText from '../components/AddText';
import home from '../styles/Home.module.css';

interface HomeProps {
  user: {
    name : string, 
    avatar : string
  }
}

export default function Home({ user }: HomeProps) {
  return (
    <>
      <Head>
        <title>ProtoText - share your text</title>
        <meta name="description" content="Share your texts" />
      </Head>

      <main className={home["container"]}>
        <AddText />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx : GetServerSidePropsContext) {
  // const cookies = parseCookies(ctx);

  // console.log('supabase :', await supabase.auth.setSession(
  //   {
  //     refresh_token: cookies['my-refresh-token'],
  //     access_token: cookies['my-access-token'],
  //   }
  // ))

  // supabase.auth.
  // const cookies = parseCookies(ctx);

  // const { data } = await supabase.auth.setSession({
  //   refresh_token: cookies['my-refresh-token'],
  //   access_token: cookies['my-access-token'],
  // })

  // const user = {
  //   name : data.user?.user_metadata.name, 
  //   avatar : data.user?.user_metadata.avatar_url
  // }

  return {
    props: {
      // user
    }
  }

}