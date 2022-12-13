import Head from 'next/head';
import AddText from '../components/AddText';
import Image from 'next/image'
import home from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>ProtoText - share your text</title>
        <meta name="description" content="Share your texts" />
      </Head>

      <main className={home["container"]}>
        <AddText />
      </main>
    </>
  )
}
