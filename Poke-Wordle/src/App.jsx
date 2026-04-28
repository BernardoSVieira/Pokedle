import { useState } from 'react'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [pokemonNome, setPokemonNome] = useState("")

  console.log(pokemonNome)
  console.log(pokemon)

  async function buscarPokemon() {
    const resposta = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonNome.toLowerCase()
    )

    const dados = await resposta.json()
    setPokemon(dados)
  }

  return (
    <div className="hero">
      <h1>Poké-Wordle</h1>

      <input 
        type="text"
        placeholder="Digite o nome do Pokémon"
        onChange={(e) => {
          setPokemonNome(e.target.value)
        }}
      />

      <button onClick={buscarPokemon}>
        Buscar
      </button>

      <p>{pokemon?.name}</p>
    </div>
  )
}

export default App