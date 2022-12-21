import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { supabase } from '../../services/supabase';
import { SessionContext } from '../../hooks/useSession';

import SignOutIcon from '../../assets/Sing-Out.svg';
import User from '../../assets/User.svg';
import UserProfile from '../../assets/User-Profile.svg';
import LightTheme from '../../assets/Light-Theme.svg';

import header from './header.module.css';

export function LoginController() {
   const [ProfileOptions, setProfileOptions] = useState(false);
   const session = useContext(SessionContext);

   async function handleSingOutUser() {
      await supabase.auth.signOut();
   }

   function handleClickProfile() {
      setProfileOptions(true)
   }

   return (
      session === null ? (
         <div className={header["header-controllers"]}>
            <Link
               href="/entrar"
               className={header["login-button"]}
            >
               <User />
               Entrar
            </Link>

            <Link
               href="/cadastrar"
               className={header["signup-button"]}
            >Cadastrar</Link>
         </div>
      ) :

      (session ? (
         <div
            className={header["profile-container"]}
            onMouseOver={() => handleClickProfile()}
            onMouseOut={() => setProfileOptions(false)}
         >
            <div
               className={header["profile-button"]}
               tabIndex={0}
            >
               <div
                  className={header["profile-cover"]}
               >
                  <Image
                     fill
                     src={session.user.user_metadata.avatar_url}
                     alt={session.user.user_metadata.name + ' perfil'}
                  />
               </div>

               <span>Meu perfil</span>
            </div>

            <div className={header["options-divisor"]}></div>

            <ul
               className={`${header["profile-options"]} ${ ProfileOptions && header["options-active"] }`}
               tabIndex={0}
            >
               <li>
                  <UserProfile />
                  Ver Perfil
               </li>
               <li>
                  <LightTheme />
                  Tema Claro
               </li>
               <li
                  onClick={handleSingOutUser}
               >
                  <SignOutIcon />
                  Sair
               </li>
            </ul>
         </div>
      ) : (
         <div
            className={header["profile-loading"]}
         >
            <div className={header["loading"]}></div>
         </div>
      ))
   )
}
