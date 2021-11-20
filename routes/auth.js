const { myQuery } = require('../db_config')
const { preventSQLInjection } = require('../helpers/preventInjection')

const router = require('express').Router()

router.post('/login', async (req, res) => {
	try {
		const { username, password, remember } = req.body

		if (!username || !password) {
			return res.status(400).send({ err: true, msg: 'Missing username or password?' })
		}

		if (preventSQLInjection([username, password])) return res.status(418).send({ err: true, msg: 'Naughty naughty!' })

		const tryLogin = await myQuery(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`)

		if (!tryLogin.length) return res.status(400).send({ err: true, msg: 'Wrong username or password?' })

		delete tryLogin[0].password

		req.session.user = tryLogin[0]
		if (!remember) req.session.cookie.maxAge = 300000 // reset every 5 mins

		return res.send({ user: tryLogin[0], msg: 'Logged in!' })
	} catch (e) {
		console.log(e)
		return res.status(500).send({ err: true, msg: 'Server Messed Up! Try Again Later..' })
	}
})

router.post('/register', async (req, res) => {
	try {
		const { username, password, first, last } = req.body

		if (!username || !password || !first || !last) {
			return res.status(400).send({ err: true, msg: 'Missing parameters, please fill all inputs.' })
		}

		if (preventSQLInjection([username, password, first, last])) return res.status(418).send({ err: true, msg: 'Naughty naughty!' })

		const tryRegister = await myQuery(`SELECT * FROM users WHERE username = "${username}"`)

		if (tryRegister.length) return res.status(400).send({ err: true, msg: 'User already exists...' })

		await myQuery(`INSERT INTO users(username, password, first_name, last_name) VALUES ("${username}","${password}","${first}","${last}")`)

		res.send({ msg: 'Registered Successfully!' })
	} catch (e) {
		console.log(e)
		return res.status(500).send({ err: true, msg: 'Server Messed Up! Try Again Later..' })
	}
})

router.delete('/logout', (req, res) => {
	try {
		req.session.destroy()
		
		res.send({msg:'Logged out 🙂'})
	} catch (err) {
		res.status(400).send({err:true,msg:err})
	}
	})

module.exports = router
