import './Tasto.css'

function Tasto({testo, titolo, autore, casaEditrice, genere, copertina}){
    if(testo==="Aggiungi"){
    return(
    <>
        <div id="info">
            <h2>Aggiungi un libro</h2>
            <h3>Titolo*</h3>
            <input type="text" />
            <h3>Autore*</h3>
            <input type="text" />
            <h3>Casa Editrice*</h3>
            <input type="text" />
            <h3>Genere</h3>
            <input type="text" />
            <h3>Copertina</h3>
            <input type="text" />
        </div>
    </>
    )
}
}

export default Tasto