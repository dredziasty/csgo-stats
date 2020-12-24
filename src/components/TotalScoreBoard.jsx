import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HorizontalBarChart, PolarChart, BarChart } from './charts'
import useTotalScoreBoard from './../hooks/useTotalScoreBoard'
import axios from 'axios'
import { colors } from './../utils'

const Container = styled.div`
  padding: 1rem;
`

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0 0 0.5rem;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button`
  appearance: none;
  border: none;
  background-color: hsl(30, 80%, 80%);
  cursor: pointer;
  border: hsl(30, 80%, 60%) 2px solid;
  transition: 0.1s ease-in-out;
  outline: none;
  color: hsl(0, 0%, 35%);
  font-weight: bold;
  padding: 0.3rem;
  margin: 0 0.5rem 0 0;

  &:hover {
    border: hsl(30, 80%, 50%) 2px solid;
    background-color: hsl(30, 80%, 90%);
  }
`

const Select = styled.select`
  border: none;
  background-color: hsl(30, 80%, 80%);
  text-align: center;
  cursor: pointer;
  border: hsl(30, 80%, 60%) 2px solid;
  transition: 0.1s ease-in-out;
  outline: none;
  color: hsl(0, 0%, 35%);
  font-weight: bold;
  padding: 0.3rem;

  &:hover {
    border: hsl(30, 80%, 50%) 2px solid;
    background-color: hsl(30, 80%, 90%);
  }
`
const Option = styled.option`
  transition: 0.1s ease-in-out;

  &:hover {
    border: hsl(30, 80%, 50%) 2px solid;
    background-color: hsl(30, 80%, 90%);
  }
`

const Label = styled.label`
  color: hsl(0, 0%, 35%);
  display: inline-block;
  padding: 0.3rem;
  background-color: hsl(30, 80%, 80%);
`

const SecondWrapper = styled(Wrapper)`
  justify-content: space-evenly;
`

const Map = styled.div`
  color: hsl(0, 0%, 35%);
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(2, 3rem);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
`

const MapName = styled.h4`
  padding: 2rem 0 1rem 0;
`

const Text = styled.p`
  font-style: italic;
`

const Value = styled.p`
`

const TotalScoreBoard = () => {
  const [index, setIndex] = useState(0)
  const [totalsLength, setTotalsLength] = useState(0)
  const { names, kills, deaths, assists, hsKills, kd, hsp, adr, threeK, fourK, fiveK, mvps, damage, matches, maps, rounds } = useTotalScoreBoard(index)
  const [isDatalabels, setIsDatalabels] = useState(true)

  const fetchTotalsLenght = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/totals`)
    setTotalsLength(response.data.length)
  }

  const handleChangeTotals = (event) => {
    const index = event.target.value
    setIndex(+index)
  }

  useEffect(() => {
    fetchTotalsLenght()
  }, [])

  return (
    <Container>
      <Menu>
        <Button type="button" onClick={() => setIsDatalabels(!isDatalabels)}>toggle datalabels</Button>
        <div>
          <Label htmlFor="totals">total update:</Label>
          <Select id="totals" onChange={handleChangeTotals}>
            {Array.from(Array(totalsLength).keys()).map(value => (
              <Option key={value} value={value}>{value === 0 ? 'latest' : value}</Option>
            ))}
          </Select>
        </div>
      </Menu>
      <SecondWrapper>
        {maps.map(({ name, ties, loses, wins }) => (
          <Map key={name}>
            <MapName>{`${name.slice(3, 4).toUpperCase()}${name.slice(4, name.length)}`}</MapName>
            <Grid>
              <Text>wins</Text>
              <Text>ties</Text>
              <Text>loses</Text>
              <Value>{wins}</Value>
              <Value>{ties}</Value>
              <Value>{loses}</Value>
            </Grid>
          </Map>
        ))}
      </SecondWrapper>
      <Wrapper>
        <BarChart 
          labels={names} 
          text={'KILLS'} 
          stepSize={50} 
          isDatalabels={isDatalabels}
          datasets={[
            {
              data: kills, 
              backgroundColor: colors(),
              label: 'kills'
            }
          ]} 
        />
        <BarChart 
          labels={names} 
          text={'DEATHS'} 
          stepSize={50} 
          isDatalabels={isDatalabels}
          datasets={[
            {
              data: deaths, 
              backgroundColor: colors(),
              label: 'deaths'
            }
          ]}  
        />
      </Wrapper>
      <Wrapper>
        <BarChart 
          labels={names} 
          text={'ASSISTS'} 
          stepSize={25} 
          isDatalabels={isDatalabels}
          datasets={[
            {
              data: assists, 
              backgroundColor: colors(),
              label: 'assists'
            }
          ]} 
        />
        <BarChart 
          labels={names} 
          text={'HS KILLS'} 
          stepSize={25} 
          isDatalabels={isDatalabels}
          datasets={[
            {
              data: hsKills, 
              backgroundColor: colors(),
              label: 'hs kills'
            }
          ]} 
        />
      </Wrapper>
      <Wrapper>
        <PolarChart 
          labels={names} 
          text={'K/D'} 
          data={kd} 
          backgroundColor={colors()} 
          isDatalabels={isDatalabels} 
        />
        <PolarChart 
          labels={names} 
          text={'HS%'} 
          data={hsp} 
          backgroundColor={colors()} 
          isDatalabels={isDatalabels} 
        />
        <PolarChart 
          labels={names} 
          text={'ADR'} 
          data={adr} 
          backgroundColor={colors()} 
          isDatalabels={isDatalabels}
        />
      </Wrapper>
      <Wrapper>
        <BarChart 
          labels={names} 
          text={'3K'} 
          stepSize={5} 
          isDatalabels={isDatalabels}
          width={550}
          height={400} 
          datasets={[
            {
              data: threeK, 
              backgroundColor: colors(),
              label: '3k'
            }
          ]}
        />
        <BarChart 
          labels={names} 
          text={'4K'} 
          stepSize={5} 
          isDatalabels={isDatalabels} 
          width={550}
          height={400} 
          datasets={[
            {
              data: fourK, 
              backgroundColor: colors(),
              label: '4k'
            }
          ]}
        />
        <BarChart 
          labels={names} 
          text={'5K'} 
          stepSize={5} 
          isDatalabels={isDatalabels} 
          width={550}
          height={400}  
          datasets={[
            {
              data: fiveK, 
              backgroundColor: colors(),
              label: '5k'
            }
          ]}
        />                  
      </Wrapper>
      <Wrapper>
        <HorizontalBarChart 
          label={'damage'}
          labels={names}
          text={'DAMAGE'}
          data={damage}
          backgroundColor={colors()}
          stepSize={5000}
          isDatalabels={isDatalabels}
          width={900}
          height={500}
        />
        <HorizontalBarChart 
          label={'mvps'}
          labels={names}
          text={'MVPS'}
          data={mvps}
          backgroundColor={colors()}
          stepSize={10}
          isDatalabels={isDatalabels}
          width={500}
          height={500}
        />
      </Wrapper>
    </Container>
  )
}

export default TotalScoreBoard