import "./Libro.css"

function Libro({Titolo, Autore, CasaEditrice, Genere, Copertina, Prestito}){
    if(Prestito==true){
        Prestito="Cancella prestito"
    }else{
        Prestito="Prendi in prestito"
    }
    return(
        <>
            <div id="InfoLibro">
                <br />
                <img src={Copertina} alt={Titolo} />
                <h2>{Titolo}</h2>
                <h3>di {Autore}</h3>
                <h3>{CasaEditrice}</h3>
                <br />
                <h3>Genere: {Genere}</h3>
                <button>{Prestito}</button>
            </div>
        </>
    )
}

export default Libro