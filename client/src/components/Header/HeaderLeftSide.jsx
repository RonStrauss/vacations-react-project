import { ButtonBase, Grid, Grow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import plane from './icons8-plane-58.png'

const Img = styled('img')({
	maxWidth: '100%',
	maxHeight: '100%',
})

export default function HeaderLeftSide() {
	const nav = useNavigate()
	return (
		<Grow in={true}>
			<ButtonBase onClick={() => nav('/')} >
				<Grid container columnGap={3} justifyContent='center' alignItems='center' borderradius='10px'>
					<Img alt='plane-logo' src={plane} />
					<Typography variant='h5' fontFamily='Titillium Web, sans-serif'>
						Fly4Less
					</Typography>
				</Grid>
			</ButtonBase>
		</Grow>
	)
}
