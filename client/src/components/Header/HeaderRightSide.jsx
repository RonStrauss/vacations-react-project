import LogoutIcon from '@mui/icons-material/Logout'
import { Grid, Typography, IconButton, Tooltip } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

export default function HeaderRightSide({ user, setUser }) {
	const nav = useNavigate()

	const handleLogout = async () => {
		const res = await fetch('http://localhost:1000/auth/logout', { method: 'delete', credentials: 'include' })
		const data = await res.json()
		if (!data.err) {
			setUser(null)
			localStorage.removeItem('user')
			nav('/login')
		} else {
			alert(data.err)
		}
	}
	return (
		<Grid width='100%' height='100%'>
			{ user 
			? (
				<Grid container justifyContent='center' alignItems='center' width='100%' height='100%'>
					<Typography sx={{userSelect:'none'}}>Welcome, {user.first_name}!</Typography>
					<Tooltip title='Logout' placement='top-start'>
						<IconButton onClick={() => handleLogout()}>
							<LogoutIcon />
						</IconButton>
					</Tooltip>
				</Grid>
			) : (
				<Grid container justifyContent='center' alignItems='center' width='100%' height='100%'>
					<Typography>
						Please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink>
					</Typography>
				</Grid>
			)}
		</Grid>
	)
}
