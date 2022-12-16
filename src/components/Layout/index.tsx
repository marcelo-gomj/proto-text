import { Header } from '../Header';

interface LayoutProp {
   children: React.ReactNode;
}

export default function Layout({ children } : LayoutProp) {
   return (
      <>
         <Header />
         { children }    
      </>
   )
}