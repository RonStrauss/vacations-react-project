module.exports.getAllOrderByLikeQuery = (id, flight_start1, flight_start2, flight_ends1, flight_ends2, description) => {
	// return all flights, number of likes per, and if user liked
let q = `SELECT flights.flightID, description, destination, 
img, flight_starts, flight_ends, price, count(users_follow.flightID) AS followers,
max(IF(users_follow.userID = ${id}, TRUE, FALSE)) AS liked FROM flights
LEFT JOIN users_follow ON flights.flightID = users_follow.flightID `

	// add search filters for date and description
	if (flight_start1 || flight_ends1 || description) {
		q += `WHERE ${description ? `description LIKE "%${description}%"` : ''}`

		q += flight_start1 ? `${description ? 'AND ' : ''} flight_starts BETWEEN "${flight_start1}" AND "${flight_start2}" ` : ''

		q += flight_ends1 ? `${description || flight_start1 ? 'AND ' : ''} flight_ends BETWEEN "${flight_ends1}" AND "${flight_ends2}" ` : ''
	}

q += `GROUP BY flightID ORDER BY liked DESC, flight_starts ASC`

	return q
}
