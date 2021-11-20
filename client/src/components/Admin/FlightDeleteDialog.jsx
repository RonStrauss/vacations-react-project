import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ isDeleteDialogOpen, setIsDeleteDialogOpen, setFlightsArr,setUser }) {
	const handleFlightDelete = async () => {
		const res = await fetch("http://localhost:1000/admin/" + isDeleteDialogOpen.flightID, {
			method: "delete",
			credentials: "include"
		});
		const data = await res.json();
		if (!data.err) {
			setFlightsArr(data);
            setIsDeleteDialogOpen(false)
		} else {
			setUser(null);
			localStorage.clear();
		}
	};

	const handleClose = () => {
		setIsDeleteDialogOpen(false);
	};

	return (
		<div>
			<Dialog
				open={isDeleteDialogOpen ? true : false}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					Are you sure you'd like to delete "{isDeleteDialogOpen.destination}"?
				</DialogTitle>

				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button onClick={handleFlightDelete} autoFocus color="error" variant="outlined">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
