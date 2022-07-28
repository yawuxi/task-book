// react
import { useState } from "react"

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean | null | object>(null)

  async function request(url: string = '', options?: object) {
    setLoading(true)

    try {
      setError(false)

      const res = await fetch(url, options)

      if (!res.ok) {
        throw new Error(`Could not fetch the ${url} error - ${res.status}`)
      }

      setLoading(false)
      const data = await res.json()
      return data

    } catch (err) {
      setLoading(false)
      setError(error)
      throw error
    }
  }


  return { request, loading, error }
}

export default useHttp
