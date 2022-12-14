import Link from "next/link";
import header from "./header.module.css";

import { LoginController } from './LoginController';

import SearchIcon from "../../assets/search.svg";
import Commment from "../../assets/Comments.svg";
import Info from "../../assets/Info.svg";

export function Header(){
   return (
     <header className={header["container"]}>
         <div className={header["header-logo"]}>ProtoText</div>

         <nav>
            <ul className={header["menu-main"]}>
               <Link href="/">
                  <li>
                     <Commment />
                     Feed
                  </li>
               </Link>

               <li>
                  <SearchIcon />
                  Pesquisar
               </li>

               <li>
                  <Info />
                  <Link href="/sobre">Sobre</Link>
               </li>
            </ul>
         </nav>

         <div className={header["login"]}>
            <LoginController />
         </div>
     </header>
   )
}