import Link from 'next/link';
import feed from './feed.module.css';

interface FeedListProps {
   id: string;
   post_id: string;
   content: string;
   created_at: string;
   email: string;
   is_public: boolean;
}

interface FeedListComponentProps {
   list: FeedListProps[]
}

export function FeedList({ list } : FeedListComponentProps) {

   return (
      <>
         <section>
            {
               list.map(item => {
                  return (
                     <article
                        key={item.id}
                        className={feed["post"]}
                        tabIndex={0}
                     >
                        <Link href={"/post/" + item?.post_id}>
                           <h3
                              className={feed["post-header"]}
                           >{item.email}</h3>
                           <p>{item.content}</p>

                           <div className={feed["post-react"]}>
                              <div>Curtir</div>
                              <div>Comentar</div>
                           </div>
                        </Link>

                     </article>
                  )
               })
            }
         </section>
      </>
   )
}