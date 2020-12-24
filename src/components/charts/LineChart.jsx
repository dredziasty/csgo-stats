import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

const LineWrapper = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  padding: 2rem;
`

const LineChart = ({ 
  text, 
  labels, 
  max, 
  stepSize, 
  isDatalabels=true, 
  isLegend=true,
  width=720, 
  height=450, 
  datasets 
}) => {
  return (
    <LineWrapper width={`${width}px`} height={`${height}px`} >
      <Line 
        options={{
          layout: {
            padding: {
              left: 10,
              right: 10
            }
          },
          legend: {
            display: isLegend
          },
          maintainAspectRatio: false,
          title: {
            display: true,
            text: text,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: stepSize,
                  max: max,
                }
              }
            ],
          },
          plugins: {
            datalabels: {
              anchor: 'center',
              align: 'top',
              display: isDatalabels,
            }
          }
        }}
        data={{
          labels: labels,
          datasets: datasets
        //   datasets: datasets.map(({ data, label, pointColor, borderColor, pointRadius }) => {
        //       return {
        //         label: label,
        //         data: data,
        //         fill: false,
        //         lineTension: .3,
        //         borderColor: borderColor,
        //         pointBackgroundColor: pointColor,
        //         pointBorderColor: pointColor,
        //         pointRadius: pointRadius,
        //         datalabels: {
        //           display: !label.match('avg')
        //         }
        //       }
        //     })
        }}
      />
    </LineWrapper>
  )
}

export default LineChart