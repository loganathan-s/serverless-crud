'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = { TableName: process.env.DYNAMO_DBTABLE };

module.exports.list = (event, context, callback) => {

	dynamoDb.scan(tableName, (error, users) => {
	    if (error) {
	      console.error(error);
	      callback(null, {
	        statusCode: error.statusCode || 501,
	        headers: { 'Content-Type': 'text/plain' },
	        body: 'Couldn\'t fetch the users.',
	      });
	      return;
	    }

	    const response = {
      		statusCode: 200,
      		body: JSON.stringify(users.Items),
    	};
    	 callback(null, response);
	});

}