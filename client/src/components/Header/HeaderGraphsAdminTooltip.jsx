import {Assessment as AssessmentIcon} from '@mui/icons-material/'
import {Grid, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router';

export default function HeaderGraphsAdminTooltip() {
    const nav = useNavigate()
	return (
		<Grid container justifyContent='center' alignItems='center' height='100%'>
			<Tooltip title='Stats'>
				<IconButton onClick={()=>nav('/stats')}>
					<AssessmentIcon />
				</IconButton>
			</Tooltip>
		</Grid>
	)
}
