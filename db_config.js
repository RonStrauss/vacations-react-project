const mysql = require("mysql");

const con = mysql.createConnection({
	host: "sql4.freemysqlhosting.net",
	user: "sql4452254",
	password: "4unDZ32w1w",
	database: "sql4452254",
	multipleStatements: true
	
});

con.connect(err => {
	if (err) return console.log(err);
	console.log("Connected Successfully 😁");
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
