import { useState, useEffect } from 'react'
import axios from 'axios'

const slugs = ['boomer', 'patriarcha', 'dred', 'thestrike', 'legdin']

const usePlayer = (slug) => {
  const [name, setName] = useState('')
  const [index, setIndex] = useState(-1)
  const [matches, setMatches] = useState([])

  const fetchPlayer = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/players/${slug}`)
    
    setName(response.data.name)
    setMatches(response.data.matches)
  }

  useEffect(() => {
    setIndex(slugs.findIndex(value => value === slug))
    fetchPlayer()
  }, [slug])

  return { name, matches, index }
}

export default usePlayer