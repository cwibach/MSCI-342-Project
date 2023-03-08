let mysql = require('mysql');
let config = require('../config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const router = express.Router();
const port = process.env.PORT || 5000;
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.use(express.static(path.join(__dirname, "client/build")));

// // ---------------------------------------------------------------------

app.post('/api/addRenter', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Renters (username, password, email, phone, bedtime, birthday, gender, cook, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.bedtime, req.body.birthday, req.body.gender, req.body.cook, req.body.first_name, req.body.last_name];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

module.exports = router;