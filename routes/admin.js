const { myQuery } = require('../db_config')
const { getAllOrderByLikeQuery } = require('../helpers/getAllOrderByLikeQuery')
const { onlyAdmins } = require('../helpers/onlyAdmins')
const router = require('express').Router()

router.use(onlyAdmins)

router.post('/newFlight', async (req, res) => {
	try {
        const {userID} = req.session.user
		const { description, destination, img, flight_starts, flight_ends, price } = req.body

		if (!description || !destination || !img || !flight_starts || !flight_ends || !price)
			return res.status(400).send({ err: true, msg: 'Missing parameters, please fill all inputs.' })

		await myQuery(
			`INSERT INTO flights(description, destination, img, flight_starts, flight_ends, price) VALUES ("${description}", "${destination}", "${img}", "${flight_starts}", "${flight_ends}",  ${+price})`
		)

		res.send(await myQuery(getAllOrderByLikeQuery(userID)))
	} catch (err) {
		console.error(err)
		return res.status(500).send({ err: true, msg: 'Server Messed Up! Try Again Later..' })
	}
})

router.put('/:flightID', async (req, res) => {
	try {
		const { flightID } = req.params
		const { userID } = req.session.user

		const { description, destination, img, flight_starts, flight_ends, price } = req.body

		if (!description || !destination || !img || !flight_starts || !flight_ends || !price)
			return res.status(400).send({ err: true, msg: 'Missing parameters, please fill all inputs.' })

		const tryFlightExists = await myQuery(`SELECT * FROM flights WHERE flightID = ${flightID}`)

		if (!tryFlightExists.length) return res.status(400).send({ err: true, msg: "Couldn't find flight" })

		await myQuery(
			`UPDATE flights SET description = "${description}", destination = "${destination}", img = "${img}", flight_starts = "${flight_starts}", flight_ends = "${flight_ends}", price = ${price} WHERE flightID = ${flightID}`
		)

		res.send(await myQuery(getAllOrderByLikeQuery(userID)))
    	} catch (e) {
		console.log(e)
		return res.status(500).send({ err: true, msg: 'Server Messed Up! Try Again Later..' })
	}
})

router.delete('/:flightID', async (req, res) => {
	try {
		const { flightID } = req.params
		const { userID } = req.session.user

		const tryFlightExists = await myQuery(`SELECT * FROM flights WHERE flightID = ${flightID}`)

		if (!tryFlightExists.length) return res.status(400).send({ err: true, msg: "Couldn't find flight" })

		await myQuery(`DELETE FROM users_follow WHERE flightID = ${flightID}; DELETE FROM flights WHERE flightID = ${flightID}`)

		res.send(await myQuery(getAllOrderByLikeQuery(userID)))
	} catch (e) {
		console.log(e)
		return res.status(500).send({ err: true, msg: 'Server Messed Up! Try Again Later..' })
	}
})

module.exports = router
