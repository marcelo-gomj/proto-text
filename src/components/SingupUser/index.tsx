import { useState } from "react";

interface FormValues {
   name: string,
   username: string,
   email: string,
   password: string,
   repeatPassword: string
}

export function FormSingup() {
   const  {register, handleSubmit } = useForm<FormValues>();
   const [ data, setData ] = useState("");

   function submitData(data: FormValues){
      console.log(data)
   }

   return (
      <form
         onSubmit={handleSubmit(submitData)}

      >

         <label htmlFor="name">Nome Completo:
            <input
               {...register("name", {
                  required: true,
                  maxLength: 25,
                  minLength: 3
               })}
               type="text"
               id="name"
            />
         </label>

         <label htmlFor={"username"}>Nome do Usuário:
            <input
               {...register("username", {
                  required: true,
                  pattern: /^[\w-\.]+/g,
                  maxLength: 15,
                  minLength: 3
               })}

               type="text"
               id="username"
            />
         </label>

         <label htmlFor="email">Email:
            <input
               {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
               type="email"
               id="email"
            />

         </label>

         <label htmlFor="password">Digite uma senha:
            <input
               {...register("password", { required: true, minLength: 6 })}
               type="password"
               id="password"
            />

         </label>

         <label htmlFor="password">Digite a senha novamente:
            <input
               {...register("repeatPassword", { required: true, minLength: 6 })}
               type="password"
               id="repeatPassword"
            />

         </label>

         <input
            type="submit"
            value="Cadastrar"
            className={cadastrar["submit-button"]}
         />

      </form>
   )
}