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

// Get Renter Profile Info Api
app.post('/api/getRenterProfileInfo', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Renters
	WHERE osellner.Renters.renter_id LIKE ?
	`;
	console.log(sql);
	let data = [req.body.renter_id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get Landlord Profile Info Api
app.post('/api/getLandlordProfileInfo', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Landlords
	WHERE osellner.Landlords.landlord_id LIKE ?
	`;
	console.log(sql);
	let data = [req.body.landlord_id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get Posting Info Api
app.post('/api/getPostingInfo', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Landlords
	WHERE osellner.Renters.landlord_id LIKE ?
	`;
	console.log(sql);
	let data = [req.body.posting_id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get Renters Api
app.post('/api/getRenters', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Renters
	WHERE osellner.Renters.renter_id NOT LIKE ?`;
	console.log(sql);
	let data = [req.body.renter_id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get Landlord Postings Api
app.post('/api/getMyUnits', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Postings
	WHERE osellner.Postings.creator_id LIKE ?`;
	console.log(sql);
	let data = [req.body.creator_id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get All Postings Api
app.post('/api/getAllUnits', (req, res) => {

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

// Get Interested Renters Api
app.post('/api/getInterestedRenters', (req, res) => {

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

// Get Renter UserID Api
app.post('/api/getRenterUserID', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT renter_id FROM osellner.Renters
	WHERE osellner.Renters.email LIKE ?
	`;
	console.log(sql);
	let data = [req.body.email];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Get Landlord UserID Api
app.post('/api/getLandlordUserID', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT landlord_id FROM osellner.Landlords
	WHERE osellner.Landlords.email LIKE ?
	`;
	console.log(sql);
	let data = [req.body.landlord_id];

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

// Add Renter Api
app.post('/api/addRenter', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Renters (username, password, email, phone, bedtime, birthday, gender, cook, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.bedtime, req.body.birthday, req.body.gender, req.body.cook, req.body.first_name, req.body.last_name];
	
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

	let sql = `INSERT INTO osellner.Landlords (username, password, email, phone, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)`;
	let data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.first_name, req.body.last_name];
	
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

// Add Interested Api
app.post('/api/addInterest', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Interested (renter_id, posting_id) VALUES (?, ?)`;
	let data = [req.body.renter_id, req.body.posting_id];
	
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
