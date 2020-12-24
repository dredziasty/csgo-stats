import { Polar } from "react-chartjs-2"
import styled from 'styled-components'

const PolarWrapper = styled.div`
  padding: 2rem;
  height: ${props => props.height};
  width: ${props => props.width};
`

const PolarChart = ({ text, data, backgroundColor, labels, isDatalabels, width=590, height=600 }) => {
  return (
    <PolarWrapper width={`${width}px`} height={`${height}px`} >
      <Polar
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: text,
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
              data: data,
              backgroundColor: backgroundColor,
            },
          ],
        }}
      />
    </PolarWrapper>
  )
}

export default PolarChart