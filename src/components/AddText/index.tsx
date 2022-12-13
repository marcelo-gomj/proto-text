import { useState } from 'react';
import add from './add-text.module.css';

export default function AddText(){
   const [isBoxActive, setIsBoxActive] = useState(false);
   
   const rows = isBoxActive ? 6 : 2;
   
   return (
      <section className={add["container"]}>
         <h3>O que está acontecendo?</h3>
         
         <form 
            action=""
            onFocus={() => setIsBoxActive(true)}
            onBlur={() => setIsBoxActive(false)}
         >
            <textarea
               className={add["text-area-container"]} 

               rows={rows} cols={30}
            />

            <input 
               className={add["send-button"]}
               type="button" 
               value="Enviar"    
            />
         </form>
      </section>
   )
}