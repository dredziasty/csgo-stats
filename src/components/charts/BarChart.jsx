import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

const BarWrapper = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  padding: 2rem;
`

const BarChart = ({ 
  datasets,
  text, 
  labels, 
  stepSize, 
  isDatalabels=true, 
  width=720, 
  height=450, 
  stacked,
  max,
  legend,
  align='center',
  anchor='center',
}) => {
  return (
    <BarWrapper width={`${width}px`} height={`${height}px`} >
      <Bar 
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: text,
          }, 
          legend: {
            display: legend,
          }, 
          scales: {
            yAxes: [
              {
                stacked: stacked,
                ticks: {
                  beginAtZero: true,
                  stepSize: stepSize,
                  max: max,
                }
              }
            ],
            xAxes: [
              {
                stacked: stacked 
              }
            ]
          },
          plugins: {
            datalabels: {
              anchor: anchor,
              align: align,
              display: isDatalabels,
            },
            
          }
        }}
        data={{
          labels: labels,
          datasets: datasets
        }}
      />
    </BarWrapper>
  )
}

export default BarChart