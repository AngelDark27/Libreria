import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Tasto from './componenti/Tasto.jsx';
import Libro from './componenti/Libro';
import './App.css';

//creo connessione a pocketbase
const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const [libri, setLibri] = useState([]); //lirbi del pocketbase
  const [isLoading, setIsLoading] = useState(false); //caricamento libri


  async function aggiungiLibro(nuovoLibro) {
    try {
      const libro = {
        Titolo: nuovoLibro.Titolo,
        Autore: nuovoLibro.Autore,
        CasaEditrice: nuovoLibro.CasaEditrice,
        Genere: nuovoLibro.Genere || "Non indicato",
        Copertina: nuovoLibro.Copertina || "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1",
        Prestito: false
      };

      console.log("libro inviato:", libro);

      const record = await pb.collection("Libri").create(libro); //carica il libro in pocketbase
   
      setLibri(prev => [...prev, { id: record.id, ...libro }]); //aggiorna la lista di libri con quello nuovo
      
      alert("Libro aggiunto correttamente!");

    } catch (error) { //messaggio in caso di errore
      console.error("Errore dettagliato:", error);
      alert("Errore durante l'inserimento: " + (error.message || "Riprova"));
    }
  }

  //carica libri
  useEffect(() => {
    let carica = true;
    
    async function caricaLibri() {
      try {
        setIsLoading(true);
        const result = await pb.collection('Libri').getFullList(); //carica tutti gli elementi della collezione libri

        if (carica) {
          const libriData = result.map(libro => ({
            id: libro.id,
            Titolo: libro.Titolo,
            Autore: libro.Autore,
            CasaEditrice: libro.CasaEditrice,
            Genere: libro.Genere || "Non indicato",
            Copertina: libro.Copertina || "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1",
            Prestito: libro.Prestito
          }));

          setLibri(libriData);
        }
      } catch (error) {
        console.error('Errore nel caricamento dei libri:', error);
      } finally {
        if (carica) {
          setIsLoading(false);
        }
      }
    }

    caricaLibri();
    
    return () => {
      carica = false;
    };
  }, []);

  if (isLoading) {
    return <h2>Caricamento dati...</h2>;
  }

  const libriDisponibili = libri.filter(libro => libro.Prestito === false); //lista libri disponibili
  const libriInPrestito = libri.filter(libro => libro.Prestito === true); //lista libri in prestito

  return (
    <div id="main">
      <h1>MyLibrary</h1>

      <h2>Libri disponibili</h2>
      <Tasto testo="Aggiungi" onAggiungi={aggiungiLibro} />

      {libriDisponibili.map(libro => ( //mosta i libri disponibili
        <Libro
          key={libro.id}
          Titolo={libro.Titolo}
          Autore={libro.Autore}
          CasaEditrice={libro.CasaEditrice}
          Genere={libro.Genere}
          Copertina={libro.Copertina}
        />
      ))}

      <h2>Libri in prestito</h2>
      {libriInPrestito.map(libro => ( //mosta i libri in prestito
        <Libro
          key={libro.id}
          Titolo={libro.Titolo}
          Autore={libro.Autore}
          CasaEditrice={libro.CasaEditrice}
          Genere={libro.Genere}
          Copertina={libro.Copertina}
        />
      ))}
    </div>
  );
}

export default App;