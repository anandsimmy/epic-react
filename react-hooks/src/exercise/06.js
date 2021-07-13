import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

const STATUS= {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
}

function PokemonInfo({pokemonName}) {
  const [appData, setAppData]= React.useState({ status: STATUS.IDLE, pokemon: null, error: null })

  React.useEffect(() => {
    if(!pokemonName) return;
    setAppData({ status:STATUS.PENDING, pokemon: null, error: null })
    fetchPokemon(pokemonName).then(
      (pokemon) => setAppData({ status:STATUS.RESOLVED,  pokemon }),
      (error) => setAppData({ status:STATUS.REJECTED,  error })
      )
  }, [pokemonName])

  switch(appData.status){
    case STATUS.PENDING:
      return <PokemonInfoFallback name={pokemonName} />
    case STATUS.RESOLVED:
      return <PokemonDataView pokemon={appData.pokemon} />
    case STATUS.REJECTED:
      return (
        <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{appData.error.message}</pre>
        </div>
      )
    case STATUS.IDLE:
    default:
      return 'Submit a pokemon'
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
