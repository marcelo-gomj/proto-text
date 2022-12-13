import Link from "next/link";
import header from "./header.module.css";

import SearchIcon from "../../assets/search.svg";
import Commment from "../../assets/Comments.svg";
import Info from "../../assets/Info.svg";
import User from "../../assets/User.svg";

export function Header(){
   return (
     <header className={header["container"]}>
         <div className={header["header-logo"]}>ProtoText</div>

         <nav>
            <ul className={header["menu-main"]}>
               <li>
                  <Commment />
                  <Link href="/">Feed</Link>
               </li>

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
            <User />
            Usuário
         </div>
     </header>
   )
}