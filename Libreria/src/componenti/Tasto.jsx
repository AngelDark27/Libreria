import { useState } from 'react';
import './Tasto.css';

function Tasto({ testo, funzione }) {
    //stati del form
    const [Titolo, setTitolo] = useState("");
    const [Autore, setAutore] = useState("");
    const [CasaEditrice, setCasaEditrice] = useState("");
    const [Genere, setGenere] = useState("");
    const [Copertina, setCopertina] = useState("");

    function handleSubmit() {
        //controllo campi obbligatori e rimuobe gli spazzi
        if (!Titolo.trim() || !Autore.trim() || !CasaEditrice.trim()) {
            alert("Compila tutti i campi obbligatori (Titolo, Autore, Casa Editrice)!");
            return;
        }

        if (funzione) {
            funzione({
                Titolo: Titolo.trim(),
                Autore: Autore.trim(),
                CasaEditrice: CasaEditrice.trim(),
                Genere: Genere.trim(),
                Copertina: Copertina.trim()
            });
        }

        // svuota form
        setTitolo("");
        setAutore("");
        setCasaEditrice("");
        setGenere("");
        setCopertina("");
    }

    function elimina(){
        if (!Titolo.trim() || !Autore.trim() || !CasaEditrice.trim()) {
            alert("Compila tutti i campi obbligatori (Titolo, Autore, Casa Editrice)!");
            return;
        }

        if (funzione) {
            funzione({
                Titolo: Titolo.trim(),
                Autore: Autore.trim(),
                CasaEditrice: CasaEditrice.trim()
            });
        }

        // svuota form
        setTitolo("");
        setAutore("");
        setCasaEditrice("");
        setGenere("");
        setCopertina("");
    }

    if (testo === "Aggiungi") {
        return (
            <div id="info">
                <h2>Aggiungi un libro</h2>
                
                <h3>Titolo*</h3>
                <input 
                    type="text" 
                    value={Titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                />

                <h3>Autore*</h3>
                <input 
                    type="text"
                    value={Autore}
                    onChange={(e) => setAutore(e.target.value)}
                />

                <h3>Casa Editrice*</h3>
                <input 
                    type="text"
                    value={CasaEditrice}
                    onChange={(e) => setCasaEditrice(e.target.value)}
                />

                <h3>Genere</h3>
                <input 
                    type="text"
                    value={Genere}
                    onChange={(e) => setGenere(e.target.value)}
                />

                <h3>Copertina (link immagine)</h3>
                <input 
                    type="text"
                    value={Copertina}
                    onChange={(e) => setCopertina(e.target.value)}
                />

                <h3></h3>
                <button onClick={handleSubmit}>
                    Carica
                </button>
            </div>
        );
    }
    else
    if(testo === "Elimina"){
        return(
            <div id="info">
                <h2>Elimina un libro</h2>
                
                <h3>Titolo*</h3>
                <input 
                    type="text" 
                    value={Titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                />

                <h3>Autore*</h3>
                <input 
                    type="text"
                    value={Autore}
                    onChange={(e) => setAutore(e.target.value)}
                />

                <h3>Casa Editrice*</h3>
                <input 
                    type="text"
                    value={CasaEditrice}
                    onChange={(e) => setCasaEditrice(e.target.value)}
                />


                <h3></h3>
                <button onClick={elimina}>Elimina</button>
            </div>
        )
    }
    return null;
}

export default Tasto;