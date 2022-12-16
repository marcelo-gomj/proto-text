import Document, {Html, Head, NextScript, Main } from 'next/document';

export default class ProtoText extends Document {

   render(){
      return (
         <Html lang="pt-BR">
            <Head>
               <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
               <meta charSet="utf-8" />
               <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}