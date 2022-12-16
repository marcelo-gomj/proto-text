import Head from "next/head";

import { ProviderSocial } from "../components/ProvidersSocial";
import cadastrar from '../styles/cadastrar.module.css';

export default function CadastrarPage(){

   return (
      <>
         <Head>
            <title>Cadastre seu perfil</title>
            <meta 
               name="description" 
               content="Cadastre o seu perfil para compartilhar seus posts" 
            />
         </Head>

         <main>
            <section className={cadastrar["container-signup"]}>
               <h3>Cadastrar Usuário</h3>
               <ProviderSocial />
            </section>
         </main>
      </>
   )
}