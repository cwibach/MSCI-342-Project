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

router.post('/api/addPosting', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Postings (creator_id, rooms, bathrooms, apt_price, visible, address) VALUES (?, ?, ?, ?, ?, ?)`;
	let data = [req.body.creator_id, req.body.rooms, req.body.bathrooms, req.body.apt_price, req.body.visible, req.body.address];
	
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