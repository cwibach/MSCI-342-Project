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




// Add Posting Api
app.post('/api/addPosting', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Postings (reviewTitle, reviewContent, reviewScore, userID, moviesID) VALUES (?, ?, ?, ?, ?)`;
	let data = [req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore, req.body.userID, req.body.moviesID];
	
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
