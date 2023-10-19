const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`;

const auth = {
	username: config.API_KEY,
	password: config.API_SECRET,
};	

app.get('/photos', async (req, res) => {
	const response = await axios.get(BASE_URL + '/resources/image', {
		auth,
		params: {
			next_cursor: req.query.next_cursor,
		},
	});

	console.log(BASE_URL);
	return res.send(response.data);
});

app.get('/search', async (req, res) => {
	const response = await axios.get(BASE_URL + '/resources/search', {
		auth,
		params: {
			expression: req.query.expression,
		},
	});

	return res.send(response.data);
});
app.get('/download', async (req, res) => {
	
	const parameter = req.query.parameter;

	// Perform some action with the parameter (e.g., database query)
	// const responseData = `Received parameter: ${parameter}`;
	const response = await axios.get(BASE_URL + '/resources/image/'+parameter, {
		auth,
		params: {
			next_cursor: req.query.next_cursor,
		},
	});

	console.log(res.data);

  
	
  });

  app.delete('/api/users', async (req, res) =>  {
	const response = await axios.delete(BASE_URL + '/resources/image', {
		auth,
		params: {
			next_cursor: req.query.next_cursor,
		},
	});


	// Your logic to delete all users here
	// This could involve interactions with a database or other data storage
  
	// Respond with a success status code (e.g., 204 No Content)
	res.status(204).end();
  });
  
  


const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
