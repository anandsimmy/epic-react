import * as React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

const STATUS= {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
}

// class ReactErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: null };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { error };
//   }

//   render() {
//     const { error }= this.state

//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children; 
//   }
// }

const FallbackComponent= ({ error, resetErrorBoundary }) => (
  <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

function PokemonInfo({pokemonName}) {
  const [appData, setAppData]= React.useState({ status: STATUS.IDLE, pokemon: null, error: null })
  console.log('hey PokemonInfo rendering');

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
      throw new Error(appData.error.message);
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
        <ReactErrorBoundary
          FallbackComponent={FallbackComponent}
          resetKeys={[pokemonName]}
          onReset={() => setPokemonName('')}>
            <PokemonInfo pokemonName={pokemonName} />
        </ReactErrorBoundary>
      </div>
    </div>
  )
}

export default App
