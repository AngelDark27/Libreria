import "./Libro.css"

function Libro({Titolo, Autore, CasaEditrice, Genere, Copertina}){
    if(Genere!="" && Copertina!="")
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
    else if(Genere!="" && Copertina==="")
        return(
        <>
            <div id="InfoLibro">
                <br />
                <img src={"https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1"} alt={Titolo} />
                <h2>{Titolo}</h2>
                <h3>di {Autore}</h3>
                <h3>{CasaEditrice}</h3>
                <br />
                <h3>Genere: {Genere}</h3>
            </div>
        </>
        )
    else if(Genere==="" && Copertina!="")
        return(
        <>
            <div id="InfoLibro">
                <br />
                <img src={Copertina} alt={Titolo} />
                <h2>{Titolo}</h2>
                <h3>di {Autore}</h3>
                <h3>{CasaEditrice}</h3>
                <br />
                <h3>Genere: Non indicato</h3>
            </div>
        </>
        )
}

export default Libro