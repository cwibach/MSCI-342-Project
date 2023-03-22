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

router.post('/api/addInterest', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = '';

	if (req.body.interest === 0) {
		sql = `INSERT INTO osellner.Interested (renter_id, posting_id) VALUES (${req.body.renter_id}, ${req.body.posting_id});`;
	} else {
		sql = `DELETE FROM osellner.Interested
		WHERE osellner.Interested.posting_id LIKE ${req.body.posting_id}
		AND osellner.Interested.renter_id LIKE ${req.body.renter_id};`;
	}

	let data = [req.body.renter_id, req.body.posting_id, req.body.interest];
	
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