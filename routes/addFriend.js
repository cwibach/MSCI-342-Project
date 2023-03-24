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

router.post('/api/addFriend', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = '';

	if (req.body.friend_status === 0) {
		sql = `INSERT INTO osellner.Connection (friend_id, renter_id) VALUES (${req.body.friend_id}, ${req.body.renter_id});`;
	} else {
		sql = `DELETE FROM osellner.Connection
		WHERE osellner.Connection.friend_id LIKE ${req.body.friend_id}
		AND osellner.Connection.renter_id LIKE ${req.body.renter_id};`;
	}

	let data = [req.body.friend_id, req.body.renter_id, req.body.friend_status];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

module.exports = router;