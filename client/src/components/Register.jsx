import React, { useState } from 'react'
import { Alert, Avatar, Box, Button, CssBaseline, Collapse, Container, IconButton, Grid, TextField, Typography, AlertTitle } from '@mui/material'
import { LockOutlined as LockOutlinedIcon, Close as CloseIcon } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
	const [inputState, setInputState] = useState({ username: '', password: '', first: '', last: '' })
	const [open, setOpen] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)

	const nav = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		const { username, password, first, last } = inputState

		const res = await fetch('/auth/register', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ username, password, first, last }),
			credentials: 'include',
		})
		const data = await res.json()

		if (!data.err) {
			nav('/login')
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
					Sign up
				</Typography>
				<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='given-name'
								name='first'
								required
								fullWidth
								id='first'
								label='First Name'
								autoFocus
								onChange={e => {
									setInputState({ ...inputState, first: e.target.value })
									setOpen(false)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id='last'
								label='Last Name'
								name='last'
								autoComplete='family-name'
								onChange={e => {
									setInputState({ ...inputState, last: e.target.value })
									setOpen(false)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='username'
								label='Username'
								name='username'
								autoComplete='username'
								onChange={e => {
									setInputState({ ...inputState, username: e.target.value })
									setOpen(false)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='new-password'
								onChange={e => {
									setInputState({ ...inputState, password: e.target.value })
									setOpen(false)
								}}
							/>
						</Grid>
					</Grid>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Sign Up
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
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<NavLink to='/login'>Already have an account? Sign in</NavLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default Register
