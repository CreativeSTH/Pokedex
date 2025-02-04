import { useRef } from "react"
import { useNavigate } from "react-router"
import { useName } from "../../hooks/useName"
import "../home/home.css"
import pikachu from "/img/pikachu.webp"
import pokemon from "/img/pokemon.svg"
import PikachuCanvas from "./PikachuModel"

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
      {/* <PikachuCanvas /> */}
      <h1 className="title-pokedex">POKEDEX</h1>
      <div className="container-pokedex">
        <input className="input-pokedex" type="text" ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
        />
        <button className="button-pokedex" onClick={handleSetName}>Comenzar</button>
        <p className="text-pokedex">Ingresa tu nombre para continuar</p>
      </div>
    </div>
  )
}

export default Home
