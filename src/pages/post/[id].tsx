import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { supabase } from '../../services/supabase';
import { Post } from '../../types/models';
interface PostPageProps {
   post: Post
}

export default function PostPage({ post }: PostPageProps ) {
   
   return (
      <>
         <Head>
            <title>{}</title> 
         </Head>

         <main>
            <div
               style={{ width: '50%', margin: '2.5rem auto' }}
            >{post.content}</div>
         </main>
      </>      
   )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext){
   const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('post_id', params?.id)
   

   const post = data && data[0]
   
   return {
      props: {
         post,
      },
   }
}