import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Tasto from './componenti/Tasto.jsx';
import Libro from './componenti/Libro';
import './App.css';

const pb = new PocketBase('http://127.0.0.1:8090');
// Disabilita auto-cancellation per evitare errori
pb.autoCancellation(false);

function App() {
  const [libri, setLibri] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🆕 FUNZIONE PER AGGIUNGERE LIBRI
  async function aggiungiLibro(nuovoLibro) {
    try {
      // Prepara i dati - Genere e Copertina hanno valori di default se vuoti
      const payload = {
        Titolo: nuovoLibro.Titolo,
        Autore: nuovoLibro.Autore,
        CasaEditrice: nuovoLibro.CasaEditrice,
        Genere: nuovoLibro.Genere || "Non indicato", // Valore default se vuoto
        Copertina: nuovoLibro.Copertina || "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1", // Valore default se vuoto
        Prestito: false
      };

      console.log("Payload inviato:", payload);

      // Crea il record su PocketBase
      const record = await pb.collection("Libri").create(payload);

      // Aggiorna la lista libri
      setLibri(prev => [...prev, { id: record.id, ...payload }]);
      
      alert("Libro aggiunto con successo!");
    } catch (error) {
      console.error("Errore dettagliato:", error);
      alert("Errore durante l'inserimento: " + (error.message || "Riprova"));
    }
  }

  useEffect(() => {
    let isMounted = true;
    
    async function caricaLibri() {
      try {
        setIsLoading(true);
        const result = await pb.collection('Libri').getFullList();

        if (isMounted) {
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
        }
      } catch (error) {
        console.error('Errore nel caricamento dei libri:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    caricaLibri();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <h2>Caricamento dati...</h2>;
  }

  const libriDisponibili = libri.filter(libro => libro.Prestito === false);
  const libriInPrestito = libri.filter(libro => libro.Prestito === true);

  return (
    <div id="main">
      <h1>MyLibrary</h1>

      <h2>Libri disponibili</h2>
      {/* 🆕 Passa la funzione onAggiungi al componente Tasto */}
      <Tasto testo="Aggiungi" onAggiungi={aggiungiLibro} />

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