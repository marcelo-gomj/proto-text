import { supabase } from '../../services/supabase';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export function ProviderSocial(){

   async function setProviderSocial(provider : 'github' | 'google'){
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider
      })

      console.log(data)
   }


   return (
      <Auth
         redirectTo="http://localhost:3000/"
         appearance={{ theme: ThemeSupa }}
         supabaseClient={supabase}
         providers={['google', 'github']}
         socialLayout="horizontal"
      />
      )
   
} 