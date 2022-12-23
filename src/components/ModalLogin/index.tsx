import { supabase } from '../../services/supabase';

import modal from './modal.module.css';
import GoogleIcon from '../../assets/Google.svg';
import GitHubIcon from '../../assets/Github.svg';

interface IModalOptions {
   isOpenModal?: boolean;
   closeModal : any;
}

export function ModalLogin({ isOpenModal, closeModal } : IModalOptions) {
   async function setProviderSocial(provider : 'github' | 'google' | 'twitter'){
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider,
      })
   }

   return (
      <section
         className={modal["container"]}
         style={{ display: isOpenModal ? 'flex' :  'none'}}
      >
         <div className={modal["modal-content"]}>
            <div className={modal["modal-header"]}>
               <h3>Entrar com:</h3>
            </div>

            <h3 onClick={() => closeModal(false)}>CLOSE MODAL</h3>

            <div
               className={modal["content-form"]}
            >
               <div className={modal["controllers"]}>
                  <button
                     className="google-provider"
                     onClick={() => setProviderSocial('google')}
                  >
                     <GoogleIcon />
                     Entar com Google
                  </button>

                  <button
                     className="google-provider"
                     onClick={() => setProviderSocial('github')}
                  >
                     <GitHubIcon />
                     Entar com Github
                  </button>
                  {/* <button
                     className="google-provider"
                     onClick={() => setProviderSocial('twitter')}
                  >
                     Twitter
                  </button> */}

               </div>
            </div>
         </div>
      </section>
   )
}