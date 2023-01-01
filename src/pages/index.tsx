import Head from 'next/head';

import { supabase } from '../services/supabase';

import AddText from '../components/AddText';
import home from '../styles/Home.module.css';
import { FeedList } from '../components/FeedList';

interface PostProps {
  email: string;
  id: string;
  post_id: string;
  created_at: string;
  is_public: boolean;
  content: string;
}

interface HomeProps {
  listFeed: PostProps[]
}

export default function Home({ listFeed }: HomeProps) {
  return (
    <>
      <Head>
        <title>ProtoText - share your text</title>
        <meta name="description" content="Share your texts" />
      </Head>

      <main className={home["container"]}>
        <AddText />

        <FeedList
          list={listFeed}
        />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(5)

  const listFeed = data && !error ? data : [];

  return {
    props: {
      listFeed,
    }
  }
}