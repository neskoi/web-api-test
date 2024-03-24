'use client'

import { ACom } from "@/src/classes/acom";
import styles from "./page.module.css";

export default function Home() {
  const comm = new ACom()

  const init = async () => {
    comm.attachPort().then((resolve) => {
      comm.initReaderAndWriter();
      console.log('connected')
    })
  }

  const read = () => {
    setTimeout(() => {
      comm.writeData('V2-007E-007E-041E-141E-004E');
      comm.readData().then((rom) => {
        console.log(rom);
      })
    }, 5000)
  }



  return (
    <main className={styles.main}>
      <button onClick={init}>Init</button>
      <button onClick={read}>Read</button>
    </main>
  );
}
