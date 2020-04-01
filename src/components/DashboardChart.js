import React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { Card as BSCard } from 'reactstrap'
const Card = styled(BSCard)`
  border: 1px solid #e0e0e0;
  box-shadow: 4px 3px 5px rgba(66, 66, 66, 0.1);
  border-radius: 0;
  padding: 30px;
`
export default function DashboardChart() {
  return (
    <>
      <Card>
        <Bar
          width={10}
          height={300}
          options={{
            maintainAspectRatio: false,
            legend: { display: false }
          }}
          data={{
            labels: [
              'Terinfeksi',
              'Pulih',
              'Meninggal',
              'Terinfeksi',
              'Pulih',
              'Meninggal',
              'dafas'
            ],
            datasets: [
              {
                label: ['Jumlah Korban'],
                backgroundColor: ['#fcd823', '#47b3e6', '#fc3923'],
                borderColor: 'rgb(255, 99, 132)',
                data: [33, 222, 32, 22, 44, 333, 233]
              }
            ]
          }}
        />
      </Card>
    </>
  )
}
