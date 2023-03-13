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

router.post('/api/addLandlord', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Landlords (username, password, email, phone, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.first_name, req.body.last_name];
	
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