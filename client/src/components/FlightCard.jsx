import { Box, Card, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Favorite as FavoriteIcon, HighlightOff as HighlightOffIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material/'

export default function FlightCard({ flight, setFlightsArr, setUser, user, isModalOpen, setIsEditDialogOpen, setCurrentlyEdittedFlight, setIsDeleteDialogOpen }) {

	const handleFollow = async flightID => {
		const res = await fetch('/flight/follow/' + flightID, {
			method: 'put',
			credentials: 'include',
		})
		const data = await res.json()
		if (!data.err) {
			setFlightsArr(data)
		} else {
			setUser(null)
			localStorage.clear()
		}
	}

	const [isMouseOver, setIsMouseOver] = useState(0)

	return (
		<Grid item width='100%' position='relative'>
			<Card sx={{ display: 'flex' }} onPointerEnter={() => setIsMouseOver(16)} onPointerLeave={() => setIsMouseOver(0)} elevation={isMouseOver}>
				<CardContent sx={{ flex: 1 }}>
					<Typography variant='h3' fontFamily='Noto Sans, sans-serif' paragraph>
						{flight.destination}
					</Typography>
					{isModalOpen || user?.role === 'admin' ? null : (
						<Box>
							{flight.followers}
							<Tooltip title='Follow' onClick={() => handleFollow(flight.flightID)}>
								<IconButton>
									<FavoriteIcon color={flight.liked ? 'error' : 'inherit'} />
								</IconButton>
							</Tooltip>
						</Box>
					)}
					<Typography variant='subtitle1' marginBottom='-0.3rem'>
						<b>Leaves</b>: {flight.flight_starts.slice(0, 10).split('-').reverse().join('-')}
					</Typography>
					<Typography variant='subtitle1' paragraph>
						<b>Returns</b>: {flight.flight_ends.slice(0, 10).split('-').reverse().join('-')}
					</Typography>
					<Typography variant='subtitle2' paragraph>
						${flight.price}
					</Typography>
					<Typography variant='subtitle1' paragraph>
						{flight.description}
					</Typography>
				</CardContent>
				<CardMedia
					component='img'
					sx={{ maxWidth: '50%', display: { xs: 'none', sm: 'none', md: 'block' } }}
					image={flight.img}
					alt={flight.destination}
				/>
				{user?.role === 'admin' ? (
					<Grid sx={{ position: 'absolute', right:0}} container justifyContent='flex-end' gap='1rem'>
						<Tooltip title='Edit Flight' onClick={() => {
							setIsEditDialogOpen(true)
							setCurrentlyEdittedFlight({...flight, flight_starts:new Date(flight.flight_starts), flight_ends:new Date(flight.flight_ends)})}}>
							<IconButton sx={{bgcolor:'rgba(255,255,255,0.6)'}}>
								<ModeEditIcon color='warning' />
							</IconButton>
						</Tooltip>
						<Tooltip title='Delete Flight' onClick={() => setIsDeleteDialogOpen(flight)} >
							<IconButton sx={{bgcolor:'rgba(255,255,255,0.6)'}}>
								<HighlightOffIcon color='error' />
							</IconButton>
						</Tooltip>
					</Grid>
				) : null}
			</Card>
		</Grid>
	)
}
