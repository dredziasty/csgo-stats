import { useState, useEffect } from 'react'
import usePlayer from './../hooks/usePlayer'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { BarChart, LineChart } from './charts'
import { avg, getValue } from './../helpers'
import { colors } from './../utils'

const Container = styled.div`
  padding: 1rem;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const lineCommon = {
  fill: false,
  lineTensions: 0.3
}

const pointColor = c => {
  return {
    pointBorderColor: c,
    pointBackgroundColor: c
  }
}

const Player = () => {
  const { slug } = useParams()
  const { index, matches } = usePlayer(slug)
  const [labels, setLabels] = useState([])

  const getScoreBoard = getValue(matches)('scoreBoard')
  const avgMatches = avg(matches)
  
  useEffect(() => {
    setLabels([...matches.map(({ info }) => `${info.map.slice(3)} ${info.score[0]}-${info.score[1]}`)])
  }, [matches])

  return (
    <Container>
      <Wrapper>
        <LineChart 
          width={1800}
          max={40}
          stepSize={10}
          labels={labels}
          datasets={[
            {
              label: '# per match', 
              data: [...getScoreBoard('kills')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
            {
              label: `avg [${avgMatches('kills')}]`,
              data: [...matches.map(() => avgMatches('kills'))],
              pointRadius: 0,
              datalabels: {
                display: false
              },
              ...lineCommon
            }
          ]}
          text='KILLS'
        />
      </Wrapper>
      <Wrapper>
        <LineChart 
          width={1800}
          max={30}
          stepSize={10}
          labels={labels}
          datasets={[
            {
              label: '# per match', 
              data: [...getScoreBoard('deaths')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
            {
              label: `avg [${avgMatches('deaths')}]`,
              data: [...matches.map(() => avgMatches('deaths'))],
              pointRadius: 0,
              datalabels: {
                display: false
              },
              ...lineCommon
            }
          ]}
          text='DEATHS'
        />
      </Wrapper>
      <Wrapper>
        <LineChart 
          width={1800}
          max={15}
          stepSize={5}
          labels={labels}
          datasets={[
            {
              label: '# per match', 
              data: [...getScoreBoard('assists')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
            {
              label: `avg [${avgMatches('assists')}]`,
              data: [...matches.map(() => avgMatches('assists'))],
              pointRadius: 0,
              datalabels: {
                display: false
              },
              ...lineCommon
            }
          ]}
          text='ASSISTS'
        />
      </Wrapper>
      <Wrapper>
        <LineChart 
          width={1800}
          max={20}
          stepSize={5}
          labels={labels}
          datasets={[
            {
              label: '# per match', 
              data: [...getScoreBoard('headShotKills')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
            {
              label: `avg [${avgMatches('headShotKills')}]`,
              data: [...matches.map(() => avgMatches('headShotKills'))],
              pointRadius: 0,
              datalabels: {
                display: false
              },
              ...lineCommon
            }
          ]}
          text='HS KILLS'
        />
      </Wrapper>
      <Wrapper>
        <BarChart 
          text='K/D'
          width={850}
          labels={labels}
          stepSize={0.5}
          max={3}
          datasets={[
            {
              barPercentage: 0.6,
              backgroundColor: [...getScoreBoard('kd').map(value => colors(value / 1.5)[index])],
              label: 'k/d',
              data: [...getScoreBoard('kd')]
            }
          ]}
        /> 
        <BarChart 
          text='HS%'
          width={850}
          labels={labels}
          stepSize={20}
          max={80}
          datasets={[
            {
              barPercentage: 0.6,
              backgroundColor: [...getScoreBoard('hsp').map(value => colors(value / 55)[index])],
              label: 'hs%',
              data: [...getScoreBoard('hsp')]              
            }
          ]}
        /> 
        <BarChart 
          text='ADR'
          width={850}
          labels={labels}
          stepSize={20}
          max={140}
          datasets={[
            {
              barPercentage: 0.6,
              backgroundColor: [...getScoreBoard('adr').map(value => colors(value / 110)[index])],
              label: 'adr',
              data: [...getScoreBoard('adr')]
            }
          ]}
        /> 
      </Wrapper>
      <Wrapper>
        <BarChart 
          width={1600}
          text='3K / 4K / 5K'
          labels={labels}
          stepSize={2}
          datasets={[
            {
              data: [...getScoreBoard('threeK')],
              label: '3k',
              barPercentage: 0.7,
              backgroundColor: colors(0.3)[index]
            },            {
              data: [...getScoreBoard('fourK')],
              label: '4k',
              barPercentage: 0.7,
              backgroundColor: colors(0.6)[index]
            },            {
              data: [...getScoreBoard('fiveK')],
              label: '5k',
              barPercentage: 0.7,
              backgroundColor: colors(0.9)[index]
            },
          ]}
          legend={true}
          stacked={true}
        />
      </Wrapper>
      <Wrapper>
      <LineChart 
          width={800}
          max={8}
          stepSize={2}
          labels={labels}
          isLegend={false}
          datasets={[
            { 
              data: [...getScoreBoard('mvps')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
          ]}
          text='MVPS'
        />
        <LineChart 
          width={800}
          max={90}
          stepSize={15}
          labels={labels}
          isLegend={false}
          datasets={[
            {
              data: [...getScoreBoard('score')], 
              borderColor: colors()[index], 
              ...pointColor(colors(0.8)[index]),
              ...lineCommon,
            },
          ]}
          text='SCORE'
        />        
      </Wrapper>      
      <Wrapper>
        <BarChart 
          text='DAMAGE'
          width={1600}
          labels={labels}
          stepSize={500}
          max={3500}
          datasets={[
            {
              data: [...getScoreBoard('damage')],
              label: 'damage',
              barPercentage: 0.7,
              backgroundColor: colors()[index]
            }
          ]}
        />
      </Wrapper>
    </Container>
  )
}

export default Player