import PokemonCard from "./PokemonCard"

function PokemonList({pokemons}) {
  return (
    <div>
        {pokemons.map(pokemon => {
            //console.log(pokemon)
            return (
                <PokemonCard key={pokemon.name} url={pokemon.url} />
            )
        })}
    </div>
  )
}

export default PokemonList
