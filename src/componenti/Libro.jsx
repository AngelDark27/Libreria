import "./Libro.css"

function Libro({Titolo, Autore, CasaEditrice, Genere, Copertina}){
    return(
        <>
            <div id="InfoLibro">
                <br />
                <img src={Copertina} alt={Titolo} />
                <h2>{Titolo}</h2>
                <h3>di {Autore}</h3>
            </div>
        </>
    )
}

export default Libro