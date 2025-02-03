import { useRef } from "react"
import { useNavigate } from "react-router"
import { useName } from "../../hooks/useName"
import "../home/home.css"
import pikachu from "/img/pikachu.webp"
import pokemon from "/img/pokemon.svg"

function Home() {
    const inputRef = useRef()
    const {setName, name} = useName()
    const navigate = useNavigate()

    const handleSetName = (e) =>{
        if(!inputRef.current.value) return
        setName(inputRef.current.value)
        navigate('/pokedex')
    }
  return (
    <div className="container">
      <img className="pikachu" src={pikachu} alt="imagen de charizard" />
      <img className="pokelogo" src={pokemon} alt="imagen de charizard" />
      <h1>POKEDEX</h1>
      <h2>!Hola Entrenador</h2>
      <p>Para poder comenzar dame tu nombre</p>
        <input type="text" ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
         />
        <button onClick={handleSetName}>Comenzar</button>
    </div>
  )
}

export default Home
