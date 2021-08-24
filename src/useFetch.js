import { useState, useEffect } from 'react'
import paginate from './utils'

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const newPeople = paginate(data);
    setData(newPeople)
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [url])
  
  return { loading, data }
}
