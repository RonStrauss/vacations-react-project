const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 1000;
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(session(process.env.local.session));

app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/flight', require('./routes/flight'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build')); // set static folder
	//returning frontend for any route other than api
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log('Up and running on :' + PORT);
});
