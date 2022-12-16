import { supabase } from '../../services/supabase';
import providers from './providers.module.css';

export function ProviderSocial(){

   async function setProviderSocial(provider : 'github' | 'google'){
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider
      })

      // if(data){
      //    localStorage.setItem('provider', JSON.stringify(data))
      // }
   }

   return (
      <div className={providers["container"]}>
         <p className={providers["title-providers"]}>Cadastrar com : </p>
         
         <div className={providers["controllers"]}>
            <button 
               className="google-provider"
               onClick={() => setProviderSocial('google')}
            >
               Google
            </button>      
            <button 
               className="google-provider"
               onClick={() => setProviderSocial('github')}
            >
               Github
            </button>      
         </div>
      </div>
   )
   
} 