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

router.post('/api/getFilteredUnits', (req, res) => {

	let connection = mysql.createConnection(config);

	const sortDict = {
		0: "posting_id ASC",
		1: "posting_id DESC",
		2: "apt_price ASC",
		3: "apt_price DESC"
	}

	var arr = []

	let sql = ``
	
	if (req.body.renter_id && req.body.onlyInterested) {
		sql += `SELECT creator_id, Postings.posting_id AS posting_id, address, rooms, bathrooms, apt_price, visible, phone, email, renter_id FROM osellner.Postings 
		JOIN osellner.Landlords
		ON osellner.Postings.creator_id = osellner.Landlords.landlord_id
		LEFT JOIN osellner.Interested
		ON osellner.Postings.posting_id = osellner.Interested.posting_id
		WHERE visible LIKE 1
		AND (Interested.renter_id IS NULL OR Interested.renter_id LIKE \"` + req.body.userId + `\")`
	} else {
		sql += `SELECT creator_id, Postings.posting_id AS posting_id, address, rooms, bathrooms, apt_price, visible, phone, email FROM osellner.Postings 
		JOIN osellner.Landlords
		ON osellner.Postings.creator_id = osellner.Landlords.landlord_id
		WHERE visible LIKE 1`
	}

	if (req.body.minPrice) {
		arr.push("apt_price >= " + "\"" + req.body.minPrice + "\"")
	}

	if (req.body.maxPrice) {
		arr.push("apt_price <= " + "\"" + req.body.maxPrice + "\"")
	}

	if (req.body.minBed) {
		arr.push("rooms >= " + "\"" + req.body.minBed + "\"")
	}

	if (req.body.maxBed) {
		arr.push("rooms <= " + "\"" + req.body.maxBed + "\"")
	}

	if (req.body.minBath) {
		arr.push("bathrooms >= " + "\"" + req.body.minBath + "\"")
	}

	if (req.body.maxBath) {
		arr.push("bathrooms <= " + "\"" + req.body.maxBath + "\"")
	}

	for (let i = 0; i < arr.length; i++) {
		sql += " AND " + arr[i] 
	}

	sql += " ORDER BY " + sortDict[req.body.sortMethod];

	sql += ";"

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
