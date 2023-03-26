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

router.post('/api/editLandlordInfo', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `UPDATE osellner.Landlords
	SET first_name = ?, last_name = ?, phone = ?
	WHERE osellner.Landlords.landlord_id LIKE ?;`;
	console.log(sql);
	let data = [req.body.first_name, req.body.last_name, req.body.phone, req.body.userID];
    console.log(data);
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