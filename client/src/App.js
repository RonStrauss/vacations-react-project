import './App.css'

import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useState } from 'react'
import Register from './components/Register'
import FlightPage from './components/FlightPage'
import Stats from './components/Admin/Stats'
import Header from './components/Header/Header'

function App() {
	const storedUser = localStorage.getItem('user')
	const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)
	const [snackState, setSnackState] = useState(false)
	const [serverErrorMsg, setServerErrorMsg] = useState(null)
	const [flightsArr, setFlightsArr] = useState([])

	return (
		<div className='App'>
			<Header user={user} setUser={setUser} />
			<Routes>
				<Route
					path='/login'
					element={<Login user={user} setUser={setUser} snackState={snackState} setSnackState={setSnackState} serverErrorMsg={serverErrorMsg} />}
				/>
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<FlightPage flightsArr={flightsArr} setFlightsArr={setFlightsArr} user={user} setUser={setUser} setSnackState={setSnackState} setServerErrorMsg={setServerErrorMsg} />} />
				<Route path='/stats' element={<Stats setUser={setUser} flightsArr={flightsArr} user={user}/>} />
			</Routes>
		</div>
	)
}

export default App
