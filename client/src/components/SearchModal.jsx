import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Grid, Tooltip, Typography } from '@mui/material'
import FlightCard from './FlightCard'

const background = () => 'linear-gradient(90deg, rgba(223,248,255,1) 0%, rgba(180,228,255,1) 50%, rgba(223,248,255,1) 100%)'

export default function ScrollDialog({ isModalOpen, setIsModalOpen, searchArr }) {

	return (
			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				scroll='paper'
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'>
				<DialogTitle id='scroll-dialog-title'>
					Search Results
					<Tooltip title='Close'>
						<IconButton
							aria-label='close'
							onClick={() => setIsModalOpen(false)}
							sx={{
								position: 'absolute',
								right: 0,
								top: 5,
							}}>
							<CloseIcon fontSize='large' />
						</IconButton>
					</Tooltip>
				</DialogTitle>
				<DialogContent dividers={true} sx={{background}}>
						<Grid container rowGap={4}>
						{searchArr.length ? (
							searchArr.map(flight => <FlightCard key={flight.flightID} flight={flight} isModalOpen={isModalOpen}/>)
						) : (
							<Grid>
								<Typography fontSize='small'>No Results Found...</Typography>
								<Typography variant='subtitle2'>Try searching a general term, or parts of a word.</Typography>
							</Grid>
						)}</Grid>
				</DialogContent>
			</Dialog>
	)
}
