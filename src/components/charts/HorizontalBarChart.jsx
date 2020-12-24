import { HorizontalBar } from 'react-chartjs-2'
import styled from 'styled-components'

const HorizontalBarWrapper = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  padding: 2rem;
`

const HorizontalBarChart = ({ text, data, backgroundColor, labels, label, stepSize, isDatalabels, width=720, height=450 }) => {
  return (
    <HorizontalBarWrapper width={`${width}px`} height={`${height}px`} >
      <HorizontalBar 
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: text,
          }, 
          legend: {
            display: false,
          }, 
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: stepSize,
                }
              }
            ]
          },
          plugins: {
            datalabels: {
              anchor: 'center',
              align: "center",
              display: isDatalabels
            }
          }
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: backgroundColor,
            }
          ]
        }}
      />
    </HorizontalBarWrapper>
  )
}

export default HorizontalBarChart