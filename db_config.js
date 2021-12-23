const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection(
	process.env.local.dbConfig || {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'vacations',
		multipleStatements: true,
	}
);

con.connect(err => {
	if (err) return console.log(err);
	console.log('Connected Successfully 😁');
});

const promiseMeAQuery = q => {
	return new Promise((res, rej) => {
		con.query(q, (err, results) => {
			if (err) {
				rej(err);
			} else {
				res(results);
			}
		});
	});
};

module.exports = { myQuery: promiseMeAQuery };
