'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMO_DBTABLE,
		Key: {
			email: event.pathParameters.email
		}
	}

	dynamoDb.get(params, (error, user) => {
		if (error) {
			console.error(error);
			 callback(null, {
		  		statusCode: error.statusCode || 501,
				headers: { 'Content-Type': 'text/plain' },
				body: 'Couldn\'t fetch the user.',
			});
      		return;
		}
	  const response = {
      	statusCode: 200,
      	body: JSON.stringify(user.Item)
      };
      callback(null, response);

	});

}