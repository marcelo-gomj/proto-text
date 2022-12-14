import User from '../../assets/User.svg';
import header from './header.module.css';
import Link from 'next/link';

export function LoginController() {
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
}