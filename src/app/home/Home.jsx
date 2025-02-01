import { useRef } from "react"
import { useNavigate } from "react-router"
import { useName } from "../../hooks/useName"

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
    <div>
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
