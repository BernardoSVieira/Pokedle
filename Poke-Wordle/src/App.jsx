import { useEffect, useState } from 'react'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [tentativas, setTentativas] = useState([]) 
  const [pokemonSecreto, setPokemonSecreto] = useState(null)
  const [pokemonNome, setPokemonNome] = useState("") 

  useEffect(() => {
    async function gerarPokemonSecreto() {
      const idAleatorio = Math.floor(Math.random() * 1028) + 1
      try {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + idAleatorio)
        const dados = await resposta.json()
        setPokemonSecreto(dados)
        console.log("Pokemon secreto gerado:", dados.name)
      } catch (error) {
        console.error("Erro ao gerar Pokémon secreto:", error)
      }
    }
    gerarPokemonSecreto()
  }, [])

  async function buscarPokemon() {
    try {
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNome.toLowerCase())
      const dados = await resposta.json()
      setPokemon(dados)
      setTentativas([...tentativas, dados])
    } catch (error) {
      alert("Pokémon não encontrado!")
    }
  } 

  return (
    <div className="hero">
      <h1>Poké-Wordle</h1>
      <input 
        type="text" 
        placeholder="Digite o nome" 
        onChange={(e) => setPokemonNome(e.target.value)} 
      />
      <button onClick={buscarPokemon}>Buscar</button>

      <p>{pokemon?.name}</p>
      <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />

      <p> Tentativas: {tentativas.length}</p>

      {tentativas.map((p, index) => (
        <div key={index}>
          <p>{p.name}</p>
          <img src={p.sprites.front_default} alt={p.name} />
        </div>
      ))}
    </div>
  )
} 
export default App