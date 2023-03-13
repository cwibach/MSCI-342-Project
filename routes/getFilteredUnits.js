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

	let sql = `SELECT * FROM osellner.Postings
                ORDER BY ` + sortDict[req.body.sortMethod];
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
