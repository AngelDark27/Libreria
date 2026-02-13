import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Tasto from './componenti/Tasto.jsx'
import Libro from './componenti/Libro';
import './App.css'

const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const [libri, setLibri] = useState([]);
  const [isLoading, SetIsLoading] = useState(false)

  useEffect(() => {
    async function caricaLibri() {
      try {
        SetIsLoading(true)
        const result = await pb.collection('Libri').getFullList();

        const libriData = result.map(libro => ({
          Titolo: libro.Titolo,
          Autore: libro.Autore,
          CasaEditrice: libro.CasaEditrice,
          Genere: libro.Genere || '',
          Copertina: libro.Copertina || '',
        }));

        setLibri(libriData);
      } catch (error) {
        console.error('Errore nel caricamento dei libri:', error);
      } finally {
        SetIsLoading(false)
      }
    }

    caricaLibri();
  }, []);

  if(isLoading){
    return (<>
      <h2>Caricamento dati...</h2>
    </>)
  }

  return (
    <>
    <div id="main">
      <h1>MyLibrary</h1>
      <h2>Libri disponibili</h2>
      {libri.map((libro, idx) => (
        <Libro
          key={idx}
          Titolo={libro.Titolo}
          Autore={libro.Autore}
          CasaEditrice={libro.CasaEditrice}
          Genere={libro.Genere}
          Copertina={libro.Copertina}
        ></Libro>
      ))}
      <h2>Libri in prestito</h2>
      <Libro Titolo={"TitoloUno"} Autore={"AutoreUno"} CasaEditrice={"EditoreUno"} Genere={"GenereUno"} Copertina={"https://staticmy.zanichelli.it/copertine/dashboard/m40042.9788808699749.jpg"}></Libro>
    </div>
    </>
  )
}

export default App
