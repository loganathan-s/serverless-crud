'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
	const data = JSON.parse(event.body);
	const timeStamp = new Date().getTime();

	if (typeof data.email !== 'String' || typeof data.age !== 'Number') {
		console.error('Invalid Input, data type error');
		callback(new Error('Couldn\'t create user, invalid data types'));
		return
	}

	const params = {
		TableName: process.env.DYNAMO_DBTABLE,
		Item: {
			email: data.email
			age: data.age
			createdAt: timeStamp,
			updatedAt: timeStamp	
		}
	}

	dynamoDb.put(params, error => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t create user, Db error'));	
			return;
		}
	})

}