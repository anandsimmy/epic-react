// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function useMedia(query, initialState = false) {

  const debugValueFormatFunction= ({ query, initialState }) => {
    return `query:${query}, initial: ${initialState}`
  }

  React.useDebugValue({ query, initialState }, debugValueFormatFunction)
  const [state, setState] = React.useState(initialState)

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
