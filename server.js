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
const getRenterProfileInfoRouter = require('./routes/getRenterProfileInfo');
app.use('/', getRenterProfileInfoRouter);

// Get Landlord Profile Info Api
const getLandlordProfileInfoRouter = require('./routes/getLandlordProfileInfo');
app.use('/', getLandlordProfileInfoRouter);

// Get Posting Info Api
const getPostingInfoRouter = require('./routes/getPostingInfo');
app.use('/', getPostingInfoRouter);

// Get Renters Api
const getRentersRouter = require('./routes/getRenters');
app.use('/', getRentersRouter);

// Get Landlord Postings Api
const getMyUnitsRouter = require('./routes/getMyUnits');
app.use('/', getMyUnitsRouter);

// Get All Postings Api
const getAllUnitsRouter = require('./routes/getAllUnits');
app.use('/', getAllUnitsRouter);

// Get Interested Renters Api
const getInterestedRentersRouter = require('./routes/getInterestedRenters');
app.use('/', getInterestedRentersRouter);

// Get Renter UserID Api
const getRenterUserIDRouter = require('./routes/getRenterUserID');
app.use('/', getRenterUserIDRouter);

// Get Landlord UserID Api
const getLandlordUserIDRouter = require('./routes/getLandlordUserID');
app.use('/', getLandlordUserIDRouter);


/*

	APIs To Edit Data

*/



/*

	APIs To Add Data 

*/

// Add Posting Api
const addPostingRouter = require('./routes/addPosting');
app.use('/', addPostingRouter);

// Add Renter Api
const addRenterRouter = require('./routes/addRenter');
app.use('/', addRenterRouter);

// Add Landlord Api
const addLandlordRouter = require('./routes/addLandlord');
app.use('/', addLandlordRouter);

// Add Interested Api
const addInterestRouter = require('./routes/addInterest');
app.use('/', addInterestRouter);


// ---------------------------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server