import { useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { supabase } from '../../services/supabase';
import { useForm } from 'react-hook-form';
import { Post } from '../../types/models';
import { addPost } from '../../utils/database';
import { SessionContext } from '../../hooks/useSession';

import add from './add-text.module.css';
import PrivateIcon from '../../assets/Private.svg';
import PublicIcon from '../../assets/Public.svg';
import Link from 'next/link';


interface PostInputs {
   content: string;
}

export default function AddText() {
   const session = useContext(SessionContext);
   const [isBoxActive, setIsBoxActive] = useState(false);
   const [isOpenModes, setIsOpenModes] = useState(false)
   const [isPublic, setIsPublic] = useState(true);
   const [postSended, setPostSended] = useState<{ post_id: string } | null>(null);
   const ref = useRef<HTMLInputElement>(null);

   const MAX_POST_LENGTH = 560;
   const rows = isBoxActive ? 6 : 2;

   const {
      register,
      handleSubmit,
      resetField,
      watch,
      formState,
   } = useForm <PostInputs> ({
      defaultValues: {
         content: '',
      }
   });

   const watchContentField = watch(['content']);


   async function handleDataSubmit(inputValues: PostInputs) {
      if(session){
         if (!session.user) {
            session.openModal()
            return;
         }
   
         const res = await addPost({
            content: inputValues.content,
            email:  session.user.user.email || '',
            is_public: isPublic,
         })
   
         if (res) {
            resetField("content");
            setPostSended(res)
         }
      }
   }

   useEffect(() => {
      function handleClickOutside(event: Event) {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsBoxActive(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref]);

   const PRIVACY_MODE = [
      <><PrivateIcon />{"Privado (somente eu)"}</>,
      <><PublicIcon />{"Público em geral"}</>
   ]

   return (
      <section
         className={add["container"]}
         ref={ref}
      >
         <h3>O que está acontecendo?</h3>

         <form
            onSubmit={handleSubmit(handleDataSubmit)}
         >
            <textarea
               className={add["content-input"]}
               onFocus={() => setIsBoxActive(true)}

               {...register("content", {
                  required: true,
                  maxLength:  MAX_POST_LENGTH,
               })}


               rows={rows} cols={30}
            />

             { formState.errors.content?.type === 'maxLength' && !formState.isValid ? (
            
                <p
                  className={add["error-maxLength"]}
                >
                  Post Atigiu o máximo de <span>{ 
                     MAX_POST_LENGTH
                  }</span> caracteres {
                     MAX_POST_LENGTH  - watchContentField[0].length
                  }     
               </p>
            
            ) : ''}
            

            { formState.errors.content?.message && !formState.isValid ? (
            
               <p>"Post Atigiu o máximo de" + 560 caracteres) + "/ " + formState.errors.content?.ref?.value.length</p>
            
            ) : '' }
            
            { formState.isSubmitSuccessful 
            && !formState.isDirty && 
            formState.isSubmitted && postSended ? (
               <p
                  className={add["sucess-message"]}
               >
                  <Link href={'/post/'+ postSended.post_id}>
                     Enviado com sucesso ! Ver post
                  </Link>
               </p>
            ) : ''}


            <div
               className={add["post-controllers"]}
            >
               <input
                  className={add["send-post"]}
                  type="submit"
                  value="Enviar"
               />

               <ul
                  className={add["privacy-container"]}
               >
                  <li
                     className={add["privacy-button"]}
                     onClick={() => setIsOpenModes(true)}
                     tabIndex={0}
                  >
                     {PRIVACY_MODE[isPublic ? 1 : 0]}
                  </li>

                  <div
                     className={`${add["privacy-options"]} ${isOpenModes && add["options-active"]}`}
                  >
                     {PRIVACY_MODE.map((mode, index) => (
                        <li
                           onClick={() => {
                              setIsPublic(!!index)
                              setIsOpenModes(false)
                           }}

                           key={index}
                        >{mode}</li>
                     )
                     )}
                  </div>
               </ul>

            </div>
         </form>
      </section>
   )
}
