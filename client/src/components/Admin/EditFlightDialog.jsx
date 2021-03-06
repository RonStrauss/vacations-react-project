import { useState, useEffect, useRef } from 'react'
import {
	Alert,
	Button,
	Collapse,
	ButtonGroup,
	Dialog,
	Box,
	Grid,
	TextField,
	DialogContent,
	DialogTitle,
	InputAdornment,
	IconButton,
	AlertTitle,
} from '@mui/material/'
import { Close as CloseIcon } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/lab/'
import DateAdapter from '@mui/lab/AdapterDateFns'
import enLocale from 'date-fns/locale/en-GB'

export default function FormDialog({ currentlyEdittedFlight,setCurrentlyEdittedFlight, setFlightsArr, isEditDialogOpen, setIsEditDialogOpen }) {
	const today = new Date()
	const [isCollapseVisible, setIsCollapseVisible] = useState(false)
	const [isStartDateValid, setIsStartDateValid] = useState(true)
	const [isEndDateValid, setIsEndDateValid] = useState(true)
    const [collapseState, setCollapseState] = useState({severity:'error', title:'Error...', body:'Your dates are invalid, please try re-selecting'})

	const startRef = useRef()
	const endRef = useRef()

	const handleClose = () => {
		setIsEditDialogOpen(false)
	}

	const handleClearInputs = () => {
		setCurrentlyEdittedFlight({...currentlyEdittedFlight, destination: '', description: '', img: '', flight_starts: today, flight_ends: today, price: '' })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!isStartDateValid || !isEndDateValid) {
            setCollapseState({severity:'error', title:'Error...', body:'Your dates are invalid, please try re-selecting'})
        } else {
            const { destination, description, img, flight_starts, flight_ends, price, flightID } = currentlyEdittedFlight
			const res = await fetch('/admin/'+flightID, {
                method: 'put',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ destination, description, img, flight_starts, flight_ends, price }),
                credentials:'include'
			})
            const data = await res.json()
            if (!data.err) {
                setFlightsArr(data)
                setCollapseState({severity:'success',title:'Success!', body:'Flight successfully editted ????'})
            }
		}
        setIsCollapseVisible(true)
	}

	useEffect(() => {
		setIsCollapseVisible(false)
	}, [currentlyEdittedFlight])

	return (
		<Dialog open={isEditDialogOpen} onClose={handleClose}>
			<DialogTitle>Edit Existing Flight</DialogTitle>
			<DialogContent>
				<Box component='form' onSubmit={handleSubmit} mt={1}>
					<LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
						<TextField
							value={currentlyEdittedFlight?.destination}
							required
							margin='none'
							label='Destination'
							type='text'
							fullWidth
							autoFocus
							onChange={e => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, destination: e.target.value })}
						/>
						<TextField
							value={currentlyEdittedFlight?.description}
							required
							margin='dense'
							label='Description'
							type='text'
							fullWidth
							onChange={e => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, description: e.target.value })}
						/>
						<TextField
							value={currentlyEdittedFlight?.img}
							required
							margin='dense'
							label='Image URL'
							type='text'
							fullWidth
							onChange={e => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, img: e.target.value })}
						/>
						
						<Grid container width='100%' justifyContent='space-evenly'>
							<DatePicker
								label='From'
								value={currentlyEdittedFlight?.flight_starts}
								ref={startRef}
								renderInput={props => <TextField disabled margin='normal' {...props} />}
								onChange={newValue => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, flight_starts: newValue })}
								onError={() => setIsStartDateValid(false)}
								onAccept={() => setIsStartDateValid(true)}
							/>
							<DatePicker
								label='To'
								value={currentlyEdittedFlight?.flight_ends}
								clearable={true}
								renderInput={props => <TextField {...props} required margin='normal' />}
								onChange={newValue => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, flight_ends: newValue })}
								ref={endRef}
								minDate={currentlyEdittedFlight?.flight_starts}
								onError={() => setIsEndDateValid(false)}
								onAccept={() => setIsEndDateValid(true)}
							/>
						</Grid>
						<TextField
							value={currentlyEdittedFlight?.price}
							required
							margin='normal'
							type='text'
							label='Price'
							fullWidth
							helperText='Must Be A Positive(+) Integer'
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							onChange={e => setCurrentlyEdittedFlight({ ...currentlyEdittedFlight, price: e.target.value })}
							InputProps={{
								startAdornment: <InputAdornment position='start'>$</InputAdornment>,
							}}
						/>
						<Box sx={{ width: '100%' }}>
							<Collapse in={isCollapseVisible}>
								<Alert
									severity={collapseState.severity}
									action={
										<IconButton
											aria-label='close'
											color='inherit'
											size='small'
											onClick={() => {
												setIsCollapseVisible(false)
											}}>
											<CloseIcon fontSize='inherit' />
										</IconButton>
									}
									sx={{ mb: 2 }}>
									<AlertTitle>{collapseState.title}</AlertTitle>
									{collapseState.body}
								</Alert>
							</Collapse>
						</Box>
						<ButtonGroup variant='contained' aria-label='outlined primary button group' fullWidth sx={{ mt: 2 }}>
							<Button color='error' onClick={handleClearInputs}>
								Clear
							</Button>
							<Button type='submit'>Submit</Button>
						</ButtonGroup>
					</LocalizationProvider>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
