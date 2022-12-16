import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import User from '../../assets/User.svg';
import header from './header.module.css';
import { SessionContext } from '../../hooks/useSession';
undefined
export function LoginController() {
   const session = useContext(SessionContext);

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
            style={{ display: 'flex', alignItems: 'center'}}
         >
            <Image 
               // fill
               width={30}

               height={30}
               src={session.user.user_metadata.avatar_url} 
               alt={''}            />
            {session.user.user_metadata.name}
         </div>
      )
   }

   return <></>
}