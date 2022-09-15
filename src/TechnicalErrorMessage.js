import { useEffect, useState } from 'react'
import useLogging from './useLogging'

const TechnicalErrorMessage = ({ errorDetail, onRetry }) => {
  const [logged, setLogged] = useState(false)
  const { log } = useLogging()

  useEffect(() => {
    const logIt = (errorDetail) => {
      log(errorDetail)
      setLogged(true)
    }
    
    if (!logged) {
      logIt(errorDetail)
    }

  }, [logged, log, errorDetail])

  return <p>Failed! <button onClick={onRetry}>Click here to try again</button></p>
}

export default TechnicalErrorMessage