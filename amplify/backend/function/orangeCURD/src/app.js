/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const AWS = require("aws-sdk");
// const docClient = new AWS.DynamoDB.DocumeentClient();
// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

// This function is used to generated a ramdon unique id.
function id() {
  return Math.random.toString(36).substring(2) + Date.now().toString(36);
}
/**********************
 * Example get method *
 **********************/

app.get("/ProductTest", function (req, res) {
  const query = req.query;
  // or
  // const query = req.apiGateway.event.queryStringParameters
  var params = {
    TableName: "OrangeCustomerInfo-dev",
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      res.json(err, null);
    } else {
      // res.json(data.Items);
      res.json({
        success: "get call succeed!",
        event: req.apiGateway.event, // to view all event data
        query: query,
        url: req.url,
        data: data.Items,
      });
    }
  });
  // res.json({
  //   success: "get call succeed!",
  //   event: req.apiGateway.event, // to view all event data
  //   query: query,
  //   url: req.url,
  // });

  // Add your code here
  // res.json({ success: "get call succeed!", url: req.url });
});

// app.get("/ProductTest/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "get call succeed!", url: req.url });
// });

/****************************
 * Example post method *
 ****************************/

app.post("/ProductTest", function (req, res) {
  // ---------------------------- Add Code Start-----------------------------
  // console.log("i AM POST TEST:", req);
  var params = {
    TableName: "OrangeCustomerInfo-dev",
    Item: {
      id: id(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      message: req.body.message,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.json({ err });
    else
      res.json({ success: "post call succeed!", url: req.url, body: req.body });
  });
  // ---------------------------- Add Code End-----------------------------
  // Add your code here
  // res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

// app.post("/ProductTest/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "post call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example put method *
 ****************************/

// app.put("/ProductTest", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

// app.put("/ProductTest/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example delete method *
 ****************************/

// app.delete("/ProductTest", function (req, res) {
//   // Add your code here
//   res.json({ success: "delete call succeed!", url: req.url });
// });

// app.delete("/ProductTest/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "delete call succeed!", url: req.url });
// });

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
