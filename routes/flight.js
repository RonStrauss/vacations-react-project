const { myQuery } = require('../db_config')
const { allLoggedUsers } = require('../helpers/allLoggedUser')
const { getAllOrderByLikeQuery } = require('../helpers/getAllOrderByLikeQuery')
const { onlyUsers } = require('../helpers/onlyUsers')
const { preventSQLInjection } = require('../helpers/preventInjection')

const router = require('express').Router()

router.use(allLoggedUsers)

router.get('/all', async (req, res)=>{
    try {
        const {userID} = req.session.user

        res.send(await myQuery(getAllOrderByLikeQuery(userID)))
        
    } catch (e) {
        console.log(e)
        return res.status(500).send({err:true,msg: 'Server Messed Up! Try Again Later..'})
    }
})

router.post('/search', async (req, res)=>{
    try {
        const {flight_start1, flight_start2, flight_ends1, flight_ends2, description} = req.body
        const {userID} = req.session.user

        res.send(await myQuery(getAllOrderByLikeQuery(userID,flight_start1, flight_start2, flight_ends1, flight_ends2, description)))
        
    } catch (e) {
        console.log(e)
        return res.status(500).send({err:true,msg: 'Server Messed Up! Try Again Later..'})
    }
})

router.put('/follow/:flightID', onlyUsers, async (req, res)=>{
    try {
        
        const {flightID} = req.params
        const {userID} = req.session.user

        if (!flightID) return res.status(400).send({ err: true, msg: "Couldn't find flight ID in URL" })

        if (preventSQLInjection(flightID)) return res.status(418).send({ err: true, msg: "Naughty naughty!" }) // Prevent SQL Injection

        const tryFlightExists = await myQuery(`SELECT * FROM flights WHERE flightID = ${flightID}`)

        if (!tryFlightExists.length) return res.status(400).send({ err: true, msg: "Couldn't find flight" })

        const tryUserAlreadyFollowing = await myQuery(`SELECT * FROM users_follow WHERE flightID = ${flightID} AND userID = ${userID}`)

        await myQuery(tryUserAlreadyFollowing.length
            ? `DELETE FROM users_follow WHERE userID = ${userID} AND flightID = ${flightID}`
            : `INSERT INTO users_follow (userID, flightID) values(${userID},${flightID})`)

            res.send(await myQuery(getAllOrderByLikeQuery(userID)))

    } catch (e) {
        console.log(e)
        return res.status(500).send({err:true,msg: 'Server Messed Up! Try Again Later..'})
    }
})

module.exports = router