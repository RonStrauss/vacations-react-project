import React, { useState } from 'react'
import {
	Alert,
	AlertTitle,
	Avatar,
	Box,
	Button,
	Checkbox,
	Collapse,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	IconButton,
	Slide,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material'
import { LockOutlined as LockOutlinedIcon, Close as CloseIcon } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'

function SlideTransition(props) {
	return <Slide {...props} direction='up' />
}

const Login = ({ setUser, snackState, setSnackState, serverErrorMsg }) => {
	const [inputState, setInputState] = useState({ username: '', password: '', remember: true })
	const [open, setOpen] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)


	const handleClose = (e, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackState(false)
	}

	const nav = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		const { username, password, remember } = inputState

		const res = await fetch('/auth/login', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ username, password, remember }),
			credentials: 'include',
		})
		const data = await res.json()

		if (!data.err) {
			localStorage.setItem('user', JSON.stringify(data.user))

			!remember &&
				setTimeout(() => {
					localStorage.clear()
				}, 300000)

			setUser(data.user)
			nav('/')
		} else {
			setErrorMsg(data.msg)
			setOpen(true)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'blue' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in to continue
				</Typography>
				<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						fullWidth
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
						required
						onChange={e => {
							setInputState({ ...inputState, username: e.target.value })
							setOpen(false)
						}}
					/>
					<TextField
						margin='normal'
						fullWidth
						name='password'
						label='Password'
						type='password'
						autoComplete='current-password'
						required
						onChange={e => {
							setInputState({ ...inputState, password: e.target.value })
							setOpen(false)
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox
								defaultChecked
								value='remember'
								onChange={e => setInputState({ ...inputState, remember: e.target.checked })}
								color='primary'
							/>
						}
						label='Remember me'
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Box sx={{ width: '100%' }}>
						<Collapse in={open}>
							<Alert
								severity='error'
								action={
									<IconButton
										aria-label='close'
										color='inherit'
										size='small'
										onClick={() => {
											setOpen(false)
										}}>
										<CloseIcon fontSize='inherit' />
									</IconButton>
								}
								sx={{ mb: 2 }}>
								<AlertTitle>Error...</AlertTitle>

								{errorMsg}
							</Alert>
						</Collapse>
					</Box>
					<Grid container>
						<Grid item>
							<NavLink to='/register'>Don't have an account? Sign Up</NavLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Snackbar
				open={snackState}
				onClose={handleClose}
				autoHideDuration={6000}
				TransitionComponent={SlideTransition}
				message={serverErrorMsg}
				key={'Slide'}
				action={
					<IconButton aria-label='close' color='inherit' sx={{ p: 0.5 }} onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				}
			/>
		</Container>
	)
}

export default Login
