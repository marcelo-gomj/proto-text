import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';

import { supabase } from '../../services/supabase';
import { SessionContext } from '../../hooks/useSession';

import SignOutIcon from '../../assets/Sing-Out.svg';
import User from '../../assets/User.svg';
import UserProfile from '../../assets/User-Profile.svg';
import LightTheme from '../../assets/Light-Theme.svg';

import header from './header.module.css';

export function LoginController() {
   const [ProfileOptions, setProfileOptions] = useState(false);
   const ref = useRef<HTMLInputElement>(null)
   const session = useContext(SessionContext);

   async function handleSingOutUser() {
      await supabase.auth.signOut();
   }

   function handleClickProfile() {
      setProfileOptions(true)
   }

   // useEffect(() => {
   //    function handleClickOutside(event : any) {
   //      if (ref.current && !ref.current.contains(event.target)) {
   //          setProfileOptions(false)
   //       }
   //    }

   //    document.addEventListener("mousedown", handleClickOutside);
   //    return () => {
   //      document.removeEventListener("mousedown", handleClickOutside);
   //    };
   //  }, [ref]);

   if(session === null){
      return (
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
      )
   }else if(session){
      return (
         <div
            className={header["profile-container"]}
            onMouseOver={() => handleClickProfile() }
            onMouseOut={() => setProfileOptions(false)}
            // ref={ref}
         >
            <div
               className={header["profile-button"]}
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

               <span>{session.user.user_metadata.name}</span>
            </div>
            
            <div className={header["options-divisor"]}></div>
            
            <ul 
               className={`${header["profile-options"]} ${ProfileOptions && header["options-active"]}`}
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
      )
   }

   return <div
      style={{ width: '100%', height: '100%' }}
   ></div>
}
