import { useState } from 'react'
import { Button, Drawer, Box, Typography, TextField, Grow } from '@mui/material/'
import SearchIcon from '@mui/icons-material/Search'
import SearchModal from './SearchModal'

export default function TemporaryDrawer() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isSearchButtonClickable, setIsSearchButtonClickable] = useState(false)
	const [isClearSearchButtonShow, setIsClearSearchButtonShow] = useState(false)
	const [descriptionInput, setDescriptionInput] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchArr, setSearchArr] = useState([])

	const clearSearchInputs = () => {
		setIsClearSearchButtonShow(false)
		setIsSearchButtonClickable(false)
		setDescriptionInput('')
	}

	const toggleInput = value => {
		setDescriptionInput(value)
		setIsClearSearchButtonShow(value ? true : false)
		setIsSearchButtonClickable(value ? true : false)
	}

	const toggleDrawer = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setIsDrawerOpen(open)
	}

	const handleSearch = async e => {
		e.preventDefault()
		const res = await fetch('https://vacations-project-ron.herokuapp.com/flight/search', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ description: descriptionInput }),
			credentials: 'include',
		})
		const data = await res.json()
		if (!data.err) {
			setIsModalOpen(true)
			setSearchArr(data)
		}
	}

	const list = () => (
		<Box
			sx={{ width: 300 }}
			padding='1.5rem'
			role='presentation'
			component='form'
			height='50%'
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
			alignItems='center'
			container
			onSubmit={e => handleSearch(e)}>
			<Typography variant='h4' mb={-1} fontFamily='Noto Sans, sans-serif'>
				Search
			</Typography>
			<TextField label='Description' name='description' fullWidth value={descriptionInput} onChange={e => toggleInput(e.target.value)} />
			{isClearSearchButtonShow ? (
				<Grow in={true}>
					<Button onClick={() => clearSearchInputs()}>Clear Fields</Button>
				</Grow>
			) : null}
			<Button type='submit' variant='contained' disabled={!isSearchButtonClickable}>
				search
			</Button>
		</Box>
	)

	return (
		<Box
			key={'drawer'}
			width='100%'
			ml={4}
			sx={{
				marginTop: 8,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Button id='top' onClick={toggleDrawer(true)} variant='contained' endIcon={<SearchIcon />}>
				Search
			</Button>
			<Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
				{list()}
				<SearchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} searchArr={searchArr} />
			</Drawer>
		</Box>
	)
}
