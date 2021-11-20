import { Box, Grid, Grow } from '@mui/material'
import HeaderRightSide from './HeaderRightSide'
import HeaderGraphsAdminTooltip from './HeaderGraphsAdminTooltip'
import HeaderLeftSide from './HeaderLeftSide'

export default function BasicGrid({ user, setUser }) {
	return (
		<Box width='100%' height='10vh' bgcolor='rgba(155, 245, 255, 0.5)' sx={{position:'sticky', top:0, zIndex:2}}>
			<Grid height='100%' container direction='row' justifyContent='space-between' alignItems='stretch'>
				<Grid container item xs={3} justifyContent='center' alignItems='center'>
					<HeaderLeftSide />
				</Grid>
				{user?.role === 'admin' ? (
					<Grow in={true}>
						<Grid item xs={3}>
							<HeaderGraphsAdminTooltip />
						</Grid>
					</Grow>
				) : null}
				<Grow in={true}>
					<Grid item container xs={3} justifyContent='center' alignItems='center'>
						<HeaderRightSide setUser={setUser} user={user}/>
					</Grid>
				</Grow>
			</Grid>
		</Box>
	)
}
