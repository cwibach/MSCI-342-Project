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

router.post('/api/getAllUnits', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT p.posting_id, p.rooms, p.bathrooms, p.apt_price, p.address, p.visible,
	 l.phone, l.email FROM osellner.Postings AS p, osellner.Landlords AS l
	WHERE p.creator_id LIKE l.landlord_id`;
	console.log(sql);
	let data = [];

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