import { useName } from "../../hooks/useName"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import PokemonList from "./components/PokemonList"

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokedex() {
    const [pokemons, setPokemons] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
    const [selectedType, setSelectedType]= useState('all')
    const [types, setTypes] = useState([])
    const [singlePokemon, setSinglePokemon] = useState(null)

    const {name, clearName} = useName()

    // Funcion para cargar los primeros 20 pokemon
    const getInitialPokemons = () =>{
        axios
            .get(`${POKEAPI_BASE}/pokemon?limit=150`)
            .then(({data}) => {
                setPokemons(data.results)
                setFilteredPokemons(data.results)
                setSinglePokemon(null)
            })
    }

    // Cargar los tipos de pokemon
    useEffect(()=>{
        axios
        .get(`${POKEAPI_BASE}/type?limit=18`)
        .then(({data}) => setTypes(data.results))
    },[])

    //Filtrar en tiempo real miestras se escribe
    useEffect(() => {
        getInitialPokemons()
    }, [])

    useEffect(() => {
        if(!search) {
            setFilteredPokemons(pokemons)
            setSinglePokemon(null)
            return
        }

        setFilteredPokemons(
            pokemons.filter(p =>
                p.name.toLowerCase().includes(search.toLocaleLowerCase())
            )
        )

    }, [search, pokemons])

    // Cargar pokemons segun el tipo seleccionado
    useEffect(() => {
        if (selectedType === 'all') {
          getInitialPokemons()
          return  
        }
        axios.get(`${POKEAPI_BASE}/type/${selectedType}`)
            .then(({ data }) =>{
                const typePokemons = data.pokemon.map(p => p.pokemon) 
                setPokemons(typePokemons)
                setFilteredPokemons(typePokemons)
                setSinglePokemon(null)
            })
    },[selectedType])

    //
     const searchPokemon = () => {
        if (!search) {
            getInitialPokemons()
            return
        }
        axios.get(`${POKEAPI_BASE}/pokemon/${search}`)
            .then(({ data }) => {
                if (selectedType !== 'all') {
                    const isOfType = data.types.some(t => t.type.name === selectedType)
                    if (!isOfType) {
                        setSinglePokemon(null)
                        alert('El pokemon no es del tipo seleccionado')
                        return
                    }
                }
                setSinglePokemon(data)
            })
            .catch(() => {
                alert('Pokemon no encontrado')
            })
     }
 
  return (
    <div>
      <h1>Pokedex</h1>
      {name &&
      <div>
      <p>Hola {name}, aqui padras encontrar tu pokemon 
      favorito </p>
      <button onClick={clearName}> Salir </button>
      </div> 
      }
      <input 
        type="text"
        value={search}
        onChange = {(e) => setSearch(e.target.value)} 
        placeholder="Filter or Search by name or ID"
        onKeyDown = {(e) => e.key === 'Enter' && searchPokemon()}
      />
      <button onClick={searchPokemon}>Search</button>
      <select
        value={selectedType} 
        onChange = {(e) => setSelectedType(e.target.value)}>
        <option value="all">all</option>
        {types.map(type =>(
            <option key={type.name} value={type.name}>{type.name} </option>
        ))}
      </select>

       {singlePokemon ? 
        <Link to={`/pokedex/${singlePokemon.name}`}>
            <h2>{singlePokemon.name}</h2>
            <img src={singlePokemon?.sprites?.front_default} alt="" />
        </Link>
        :
        <PokemonList pokemons={filteredPokemons} />
       }
    </div>
  )
}

export default Pokedex
