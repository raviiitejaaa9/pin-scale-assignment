import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const Barchart = props => {
  const {barDataList} = props

  const getDayOfWeek = dateString => {
    const dateObject = new Date(dateString)
    const options = {weekday: 'short'}
    return dateObject.toLocaleString('en-US', options)
  }

  const modifiedData = barDataList.map(item => ({
    ...item,
    date: getDayOfWeek(item.date),
  }))

  // console.log(modifiedData)

  const transformedData = modifiedData.reduce((acc, item) => {
    if (item.type === 'debit') {
      acc[item.date] = {...acc[item.date], debit: item.sum}
    } else if (item.type === 'credit') {
      acc[item.date] = {...acc[item.date], credit: item.sum}
    }
    return acc
  }, {})

  const chartData = Object.keys(transformedData).map(date => ({
    date,
    ...transformedData[date],
  }))

  console.log(chartData)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={value => `$${value}`}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
          verticalAlign="top"
          align="right"
        />
        <Bar
          dataKey="debit"
          className="custom-bar"
          name="debit"
          fill="#1f77b4"
          barSize="10%"
        />
        <Bar
          dataKey="credit"
          className="custom-bar"
          name="credit"
          fill="#fd7f0e"
          barSize="10%"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Barchart
