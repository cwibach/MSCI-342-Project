let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// ---------------------------------------------------------------------

/*

	APIs To Get Data

*/

// Get Renters Api
app.post('/api/getRenters', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Renters`;
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

// Get Postings Api
app.post('/api/getPostings', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Postings`;
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

/*

	APIs To Edit Data

*/



/*

	APIs To Add Data 

*/

// Add Posting Api
app.post('/api/addPosting', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Postings (creator_id, rooms, apt_price, visible) VALUES (?, ?, ?, ?)`;
	let data = [req.body.creator_id, req.body.rooms, req.body.apt_price, req.body.visible];
	
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

// Add Renter Api
app.post('/api/addRenter', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Renters (username, password, email, phone, bedtime, birthday, gender, cook) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.bedtime, req.body.birthday, req.body.gender, req.body.cook];
	
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

// Add Landlord Api
app.post('/api/addLandlord', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Landlords (username, password, email, phone) VALUES (?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone];
	
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


// ---------------------------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
