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

router.post('/api/editRenterInfo', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `UPDATE osellner.Renters 
	SET first_name = ?, last_name = ?, phone = ?, bedtime = ?, cook = ?, gender = ?, birthday = ? 
	WHERE osellner.Renters.renter_id LIKE ?;`;
	console.log(sql);
	let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.bedtime, req.body.cook,
    req.body.gender, req.body.birthday, req.body.userID];

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