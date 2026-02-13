import { useState } from 'react'
import Tasto from './componenti/Tasto.jsx'
import Libro from './componenti/Libro.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>MyLibrary</h1>
      <h2>Libri disponibili</h2>
      <h2>Libri in prestito</h2>
      <Libro Titolo={"TitoloUno"} Autore={"AutoreUno"} CasaEditrice={"EditoreUno"} Genere={"GenereUno"} Copertina={"https://staticmy.zanichelli.it/copertine/dashboard/m40042.9788808699749.jpg"}></Libro>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
