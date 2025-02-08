import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import './pokemon.css'

function Pokemon() {
    const params = useParams()
    const [pokemon, setPokemon] = useState([])
    const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

    useEffect(()=>{
      if (params.name) {
        axios.get(`${POKEAPI_BASE}/pokemon/${params.name}`)
          .then(({ data }) => setPokemon(data))
      }
  },[params])

  const types = pokemon?.types?.map(t => t.type.name)
  const ability = pokemon?.abilities?.map(t => t.ability.name)
  const [hp, attack, defense, specialAttack, specialDefense, speed] = pokemon?.stats || []

  console.log(pokemon)
  return (
    <div className="containter__pokemon">
        <img className="card_pokemon_img" src={pokemon?.sprites?.other['official-artwork']?.front_default} alt="" />
      <div className="card__pokemon">
        <h2> Pokemon {params?.name} </h2>
        <span>id: #{pokemon?.id?.toString().padStart(3,0)} </span>
        <p>Weight: {pokemon?.weight} </p>
        <p>Height: {pokemon?.height} </p>
        <p>Types: {types?.join(', ')} </p>
        <p>Abilities: {ability?.join(', ')} </p>
        <p>Hp: {hp?.stat?.name} <span> {hp?.base_stat} </span> </p>
        <p>Attack: {attack?.stat?.name} <span> {attack?.base_stat} </span> </p>
        <p>Defense: {defense?.stat?.name} <span> {defense?.base_stat} </span> </p>
        <p>specialAttack: {specialAttack?.stat?.name} <span> {specialAttack?.base_stat} </span> </p>
        {/* <ul>
          {pokemon?.moves?.map(m => (
            <i key={m.move.name} >{m.move.name} </i>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default Pokemon
