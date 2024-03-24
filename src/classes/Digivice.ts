'use client'
export class Digivice {
  allowed = false;
  constructor() {
    if ("serial" in navigator) this.allowed = true;
  }

  acomRead = async () => {
    if ('serial' in navigator) {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log('opened');
        const reader = port.readable.getReader();

        while (port.readable) {
          console.log('reading');

          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                // O leitor foi fechado
                break;
              }
              // Converte a stream para texto
              const textDecoder = new TextDecoder();
              console.log(textDecoder.decode(value));
            }
          } catch (error) {
            console.error('Read error: ', error);
          } finally {
            reader.releaseLock();
          }
        }
      } catch (error) {
        console.error('Connection error: ', error);
      }
    } else {
      console.log('Web Serial API not supported.');
    }
  }
}