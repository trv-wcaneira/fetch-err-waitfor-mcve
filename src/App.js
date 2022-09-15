import { useEffect, useState } from 'react';
import TechnicalErrorMessage from './TechnicalErrorMessage';

function App() {
  const [fetchState, setFetchState] = useState({ fetching: true })

  const handleRetry = () => {
    setFetchState({ fetching: true })
  }

  useEffect(() => {
    const doTheFetch = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if (res.status === 200) {
          const data = await res.json()
          setFetchState({ todo: data.title, fetching: false })
        }
        else {
          //console.log('bad HTTP status', res.status)
          setFetchState({ failed: true })
        }
      } catch (e) {
        //console.log('error thrown', e)
        setFetchState({ failed: true })
      }
    }

    if (fetchState.fetching) {
      doTheFetch()
    }
  }, [fetchState])

  if (fetchState.fetching) {
    return <p>Loading...</p>
  }

  if (fetchState.failed) {
    return <TechnicalErrorMessage errorDetail="kaboom!" onRetry={handleRetry} />
  }

  return <p>{fetchState.todo}</p>
}

export default App;
