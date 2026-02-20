import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Tasto from './componenti/Tasto.jsx';
import Libro from './componenti/Libro';
import './App.css';

const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const [libri, setLibri] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function caricaLibri() {
      try {
        setIsLoading(true);

        const result = await pb.collection('Libri').getFullList();

        const libriData = result.map(libro => ({
          id: libro.id,
          Titolo: libro.Titolo,
          Autore: libro.Autore,
          CasaEditrice: libro.CasaEditrice,
          Genere: libro.Genere || '',
          Copertina: libro.Copertina || '',
          Prestito: libro.Prestito
        }));

        setLibri(libriData);
      } catch (error) {
        console.error('Errore nel caricamento dei libri:', error);
      } finally {
        setIsLoading(false);
      }
    }

    caricaLibri();
  }, []);

  if (isLoading) {
    return <h2>Caricamento dati...</h2>;
  }

  // 🔹 DIVISIONE LIBRI
  const libriDisponibili = libri.filter(libro => libro.Prestito === false);
  const libriInPrestito = libri.filter(libro => libro.Prestito === true);

  return (
    <div id="main">
      <h1>MyLibrary</h1>

      <h2>Libri disponibili</h2>
      <Tasto testo="Aggiungi" />

      {libriDisponibili.map(libro => (
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

      {libriInPrestito.map(libro => (
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