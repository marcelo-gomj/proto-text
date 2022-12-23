import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ModalLogin } from '../components/ModalLogin/index';

interface useLoginProps {
   children: ReactNode
}

export const ModalContext : any = createContext(null);

export function UseLogin({ children } : useLoginProps){
   const [isModal, setIsModal ] = useState<boolean>(false);

   return (
      <ModalContext.Provider value={{
         show:() =>  setIsModal(true)
      }}>
         { children }
         {/* <ModalLogin isLogin={isModal} /> */}
      </ModalContext.Provider>
   )
}