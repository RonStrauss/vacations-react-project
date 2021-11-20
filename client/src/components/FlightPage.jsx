import { Fab, Grid, Zoom, useScrollTrigger, Box } from "@mui/material";
import { Add as AddIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FlightCard from "./FlightCard";
import NewFlightDialog from "./Admin/NewFlightDialog";
import SearchDrawer from "./SearchDrawer";
import EditFlightDialog from "./Admin/EditFlightDialog";
import FlightDeleteDialog from "./Admin/FlightDeleteDialog";

function ScrollTop({children}) {

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});

	const handleClick = () => {
		document.querySelector("#top").scrollIntoView({behavior: "smooth", block: "center"});
	};

	return (
		<Zoom in={trigger}>
			<Box onClick={handleClick} children={children} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}/>
		</Zoom>
	);
}

const FlightPage = ({ flightsArr, setFlightsArr, user, setUser, setSnackState, setServerErrorMsg }) => {
	const [ isAddDiaglogOpen, setIsAddDiaglogOpen ] = useState(false);
	const [ isEditDialogOpen, setIsEditDialogOpen ] = useState(false);
	const [ currentlyEdittedFlight, setCurrentlyEdittedFlight ] = useState(null);
	const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
	const [ currentFlightDeleted, setCurrentFlightDeleted ] = useState(null);

	const handleFlightsFetch = async () => {
		const res = await fetch("/flight/all", {
			credentials: "include"
		});
		const data = await res.json();
		if (!data.err) {
			setFlightsArr(data);
		} else {
			localStorage.clear();
			setUser(null);
			setSnackState(true);
			setServerErrorMsg(data.msg);
		}
	};

	const navigate = useNavigate();

	useEffect(
		() => {
			!user && navigate("/login");
		},
		[ user ]
	);

	useEffect(() => {
		handleFlightsFetch();

		return () => {
			setFlightsArr([]);
		};
	}, []);

	return (
		<Grid width="80%" padding="1rem" spacing={4} container>
			<SearchDrawer setFlightsArr={setFlightsArr} />
			{flightsArr.map(flight => (
				<FlightCard
					key={flight.flightID}
					flight={flight}
					setFlightsArr={setFlightsArr}
					user={user}
					setUser={setUser}
					setIsEditDialogOpen={setIsEditDialogOpen}
					setCurrentlyEdittedFlight={setCurrentlyEdittedFlight}
					setIsDeleteDialogOpen={setIsDeleteDialogOpen}
				/>
			))}
			{user?.role === "admin" ? (
				<Fab
					color="primary"
					aria-label="add"
					sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
					onClick={() => setIsAddDiaglogOpen(true)}>
					<AddIcon />
				</Fab>
			) : null}
			<NewFlightDialog
				isAddDiaglogOpen={isAddDiaglogOpen}
				setIsAddDiaglogOpen={setIsAddDiaglogOpen}
				setFlightsArr={setFlightsArr}
			/>
			<EditFlightDialog
				currentlyEdittedFlight={currentlyEdittedFlight}
				setCurrentlyEdittedFlight={setCurrentlyEdittedFlight}
				isEditDialogOpen={isEditDialogOpen}
				setIsEditDialogOpen={setIsEditDialogOpen}
				setFlightsArr={setFlightsArr}
			/>
			<FlightDeleteDialog
				isDeleteDialogOpen={isDeleteDialogOpen}
				setFlightsArr={setFlightsArr}
				setUser={setUser}
				setIsDeleteDialogOpen={setIsDeleteDialogOpen}
				currentFlightDeleted={currentFlightDeleted}
			/>
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</Grid>
	);
};

export default FlightPage;
