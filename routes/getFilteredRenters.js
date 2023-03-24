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

router.post('/api/getFilteredRenters', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = "SELECT * FROM osellner.Renters WHERE osellner.Renters.renter_id NOT LIKE ? ";
	let data = [req.body.renter_id];

	var arr = []

	if (req.body.renterGender) {
		arr.push("Renters.gender LIKE " + "\"" + req.body.renterGender + "\"")
	}

	if (req.body.renterCook) {
		arr.push("Renters.cook LIKE " + "\"" + req.body.renterCook + "\"")
	}

	if (req.body.renterBed) {
		arr.push("Renters.bedtime <= " + "\"" + req.body.renterBed + "\"")
	}


	for (let i = 0; i < arr.length; i++) {
		sql += " AND " + arr[i]
	}
	sql += ";"
 
	connection.query(sql, data, (error, results, fields) => {
	if (error) {
		return console.error(error.message);
	}

	let obj = JSON.stringify(results);
	res.send({ express: obj });
});
connection.end();
});
module.exports = router;
