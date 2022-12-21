import feed from './feed.module.css';

interface FeedListProps {
   id: string;
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
                        <h3
                           className={feed["post-header"]}
                        >{item.email}</h3>
                        <p>{item.content}</p>

                     </article>
                  )
               })
            }
         </section>
      </>
   )
}