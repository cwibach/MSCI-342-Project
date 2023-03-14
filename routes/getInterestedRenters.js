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

router.post('/api/getInterestedRenters', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT osellner.Renters.renter_id, email, phone, bedtime, birthday, gender, cook, first_name, last_name FROM osellner.Interested
	JOIN osellner.Postings 
	ON osellner.Interested.posting_id = osellner.Postings.posting_id
	JOIN osellner.Renters
	ON osellner.Interested.renter_id = osellner.Renters.renter_id
	WHERE osellner.Postings.posting_id LIKE ?
	AND osellner.Renters.renter_id NOT LIKE ?`;
	console.log(sql);
	let data = [req.body.posting_id, req.body.renter_id];

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