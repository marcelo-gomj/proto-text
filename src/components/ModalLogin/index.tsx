import modal from './modal.module.css';

export function ModalLogin({ isLogin = true }) {

   return (
      <section
         className={modal["container"]}
      >
         <header className={modal["header"]}>
            <h3>Entrar com:</h3>
         </header>

         <div>

         </div>
      </section>
   )
}