import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import { supabase } from "../services/supabase";
import { useForm, FieldError } from "react-hook-form";

import { SessionContext } from "../hooks/useSession";

import account from "../styles/account.module.css";

import { debouce } from "../utils/debouceOnChange";

export default function AccountPage() {
   const session = useContext(SessionContext);
   const [checkUsername, setCheckUsername] = useState(false);
   const { register, handleSubmit, formState, trigger } = useForm();

   const urlRedirect = Router.query.path ? Router.query.path[0].replaceAll('-', '/') : '/' ;

   useEffect(() => {
      async function hasUsernameRegisted() {
         if (session && session.user) {
            const hasUsername = await supabase
               .from('profile')
               .select()
               .eq('user_reference', session.user.user.id)
               .single()

            if (!hasUsername.data?.default_username) {
               Router.push(urlRedirect)
            } else {
               setCheckUsername(true)
            }

         }
      }

      hasUsernameRegisted();

   }, [session])

   async function handleValuesSubmit(values : any) {
      const { data, error } = await supabase.auth.getSession();
      if(data.session){
         await supabase
            .from('profile')
            .update({ 
               "username": values.username,  
               "description" : values.description,
               "default_username" : false,
            })
            .eq('user_reference', data.session.user.id)

            Router.push(urlRedirect);
      }

      
   }

   async function isUsernameUnique(username: string) {

      const { data, error } = await supabase
         .from('profile')
         .select()
         .eq('username', username)

      return data?.length === 0
   }

   function handleErrorUsernameInput(error : FieldError){
      let messageError;

      switch(error.type){
         case 'isUsernameUnique':
            messageError = "Já existe esse usuário, crie outro."
            break;
         case "pattern": 
            messageError = "Formato de username incorreto."
            break;
         case "maxLength":
            messageError = "Foi atingido o máximo de 25 caracteres permitidos.";
            break;
         case "minLength":
            messageError = "Minino de 3 caracter permitidos."
            break;
         default:
            break; 
      }

      return messageError ? <p className={account["error-message"]}>{messageError}</p> : null;  
   }
   
   const userData = {
      name: session?.user?.user?.user_metadata.name || '',
      profile_image: session?.user?.user.user_metadata.picture ,
   }

   return (
      <>
         <Head>
            <title>
               Criar usuário
            </title>
         </Head>

         <main>
            <section className={account["container"]}>
               <div className={
                  `${account["loading-container"]} ${!checkUsername && account["loading-data"]}`
               }>
                  <p>ENTRANDO...</p>
               </div>

               <div className={account["form-container"]}>
                  
                  <form
                     className={account["form-content"]}
                     onSubmit={handleSubmit(handleValuesSubmit)}
                  >
                     <div className={account["header-form"]}>
                        <h4 style={{color: 'white'}}>{ userData.name }</h4>
                        <div className={account["profile-image"]}>
                           <Image 
                              fill
                              src={ userData.profile_image } 
                              alt={"imagem de perfil " + userData.name} 
                              />
                        </div>

                     </div>

                     <div className={account["input-fields"]}>
                        <h2>Crie seu perfil</h2>

                        <label htmlFor="username">Nome do usuário</label>
                        <input 
                           
                           {...register("username", {
                              pattern: /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/,
                              validate: {
                                 isUsernameUnique
                              }, 
                              required: true,
                              maxLength: 25,
                              minLength: 3
                           })} 

                           onChange={debouce(async () => {
                              await trigger('username')
                           })}
                           type="text" 
                           className={account["username-input"]} 
                        />

                        {formState.errors.username && handleErrorUsernameInput(formState.errors.username as FieldError)}
                        
                        <label htmlFor="description">Descrição</label>
                        <textarea 
                           {...register("description", {
                              maxLength: 280
                           })} 
                           className={account["textarea-input"]} 
                           rows={3}
                        />
                        
                        <input 
                           className={account["save-button"]}
                           type="submit"
                           value="Salvar" 
                        />

                     </div>
                  </form>
               </div>
            </section>
         </main>
      </>
   )
}