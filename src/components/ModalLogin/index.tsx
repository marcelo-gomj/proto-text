import { supabase } from '../../services/supabase';
import Router from 'next/router';

import GoogleIcon from '../../assets/Google.svg';
import GitHubIcon from '../../assets/Github.svg';
import CloseIcon from '../../assets/Close.svg';
import modal from './modal.module.css';

interface IModalOptions {
   isOpenModal?: boolean;
   closeModal : any;
}

export function ModalLogin({ isOpenModal, closeModal } : IModalOptions) {

   async function setProviderSocial(provider : 'github' | 'google' | 'twitter'){
      const params = '/?path=' + Router.asPath.replaceAll('/', '-');

      await supabase.auth.signInWithOAuth({
         provider,
         options: {
            redirectTo: process.env.NEXT_PUBLIC_URL + '/conta/' + params 
         }
      })
   }

   return (
      <section
         className={modal["container"]}
         style={{ display: isOpenModal ? 'flex' :  'none'}}
      >
         <div className={modal["modal-content"]}>
            <div 
               onClick={() => closeModal(false)}
               className={modal["close-icon"]}
            >
               <CloseIcon />
            </div>

            <div className={modal["modal-header"]}>
               <h3>Entrar ou Cadastrar com:</h3>
            </div>

            <div
               className={modal["content-form"]}
            >
               <div className={modal["controllers"]}>
                  <button
                     className="google-provider"
                     onClick={() => setProviderSocial('google')}
                  >
                     <GoogleIcon />
                     Acessar com Google
                  </button>

                  <button
                     className="google-provider"
                     onClick={() => setProviderSocial('github')}
                  >
                     <GitHubIcon />
                     Acessar com Github
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