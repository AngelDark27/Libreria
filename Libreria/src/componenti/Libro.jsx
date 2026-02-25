import "./Libro.css"

function Libro({Titolo, Autore, CasaEditrice, Genere, Copertina}){
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
            </div>
        </>
    )
}

export default Libro