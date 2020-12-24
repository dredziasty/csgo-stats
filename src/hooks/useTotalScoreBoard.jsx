import { useEffect, useState } from 'react'
import axios from 'axios'
import { getValue } from './../helpers'

const useTotalScoreBoard = (index) => {
  const [names, setNames] = useState([])
  const [kills, setKills] = useState([])
  const [assists, setAssists] = useState([])
  const [deaths, setDeaths] = useState([])
  const [hsKills, setHSKills] = useState([])
  const [damage, setDamage] = useState([])
  const [mvps, setMVPS] = useState([])
  const [kd, setKD] = useState([])
  const [hsp, setHSP] = useState([])
  const [adr, setADR] = useState([])
  const [threeK, setThreeK] = useState([])
  const [fourK, setFourK] = useState([])
  const [fiveK, setFiveK] = useState([])
  const [maps, setMaps] = useState([])
  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])

  const fetchTotal = async () => {
    const response = await axios.get(index === 0 ? `${process.env.REACT_APP_API}/totals/last` : `${process.env.REACT_APP_API}/totals/index/${index}`)
    const getPlayers = getValue(response.data.players)
    const getStats = getPlayers('stats')
    const getNames = getPlayers(null)('name')

    setNames([...getNames])
    setKills(getStats('kills'))
    setAssists(getStats('assists'))
    setDeaths(getStats('deaths'))
    setHSKills(getStats('headShotKills'))
    setDamage(getStats('damage'))
    setMVPS(getStats('mvps'))
    setKD(getStats('kd'))
    setHSP(getStats('hsp'))
    setADR(getStats('adr'))
    setThreeK(getStats('threeK'))
    setFourK(getStats('fourK'))
    setFiveK(getStats('fiveK'))
    setMaps([...response.data.maps])
    setMatches({...response.data.matches})
    setRounds({...response.data.rounds})
  }

  useEffect(() => {
    fetchTotal()
  }, [index])

  return { names, kills, assists, deaths, hsKills, damage, mvps, kd, hsp, adr, threeK, fourK, fiveK, maps, matches, rounds }
}

export default useTotalScoreBoard