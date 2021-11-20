import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Typography } from '@mui/material/'
import { useNavigate } from 'react-router-dom'

const Stats = ({ user, flightsArr,setUser }) => {
	const nav = useNavigate()

	useEffect(() => {
		if (!flightsArr.length || user?.role !== 'admin'){
            localStorage.clear()
            setUser(null)
            nav('/login')
        } 
	}, [])

	const [chartData, setChartData] = useState({
		labels: flightsArr.filter(flght=>flght.followers).map(flight => flight.destination),
		datasets: [
			{
				label: '# of Votes',
				data: flightsArr.filter(flght=>flght.followers).map(flight => flight.followers),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	})

	return (
		<>
			<Typography>Showing only flights that are followed</Typography>
			<Bar data={chartData} height='90vh' />
		</>
	)
}

export default Stats
