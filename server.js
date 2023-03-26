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

// Get Filtered Units Api
const getFilteredUnitsRouter = require('./routes/getFilteredUnits.js');
app.use('/', getFilteredUnitsRouter);

// Get Interested Renters Api
const getInterestedRentersRouter = require('./routes/getInterestedRenters');
app.use('/', getInterestedRentersRouter);

// Get Renter UserID Api
const getRenterUserIDRouter = require('./routes/getRenterUserID');
app.use('/', getRenterUserIDRouter);

// Get Landlord UserID Api
const getLandlordUserIDRouter = require('./routes/getLandlordUserID');
app.use('/', getLandlordUserIDRouter);

// Get Filtered Renters Api
const getFilteredRentersRouter = require('./routes/getFilteredRenters');
app.use('/', getFilteredRentersRouter);

// IsInterested Api
const isInterestedRouter = require('./routes/isInterested');
app.use('/', isInterestedRouter);

// IsFriend Api
const isFriendRouter = require('./routes/isFriend');
app.use('/', isFriendRouter);


/*

	APIs To Edit Data

*/

// Toggle Posting Visibility Api
const editVisibilityRouter = require('./routes/editVisibility');
app.use('/', editVisibilityRouter);

// Update Renter Profile Information
const editRenterInfoRouter = require('./routes/editRenterInfo');
app.use('/', editRenterInfoRouter);

// Toggle Landlord Profile
const editLandlordInfoRouter = require('./routes/editLandlordInfo');
app.use('/', editLandlordInfoRouter);

// Update Posting Information

const editPostingInfoRouter = require('./routes/editPostingInfo');
app.use('/', editPostingInfoRouter);
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

// Add Friend Api
const addFriendRouter = require('./routes/addFriend');
app.use('/', addFriendRouter);

/*

	APIs To Delete Data 

*/

// Delete Posting Api
const deletePostingRouter = require('./routes/deletePosting');
app.use('/', deletePostingRouter);


// ---------------------------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server