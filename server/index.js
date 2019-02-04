require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4000;
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const controller = require('./controllers/authController');
const treasure = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

app.use(json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: false
	})
);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
	app.set('db', dbInstance);
	console.log('db connected');
});

app.post('/auth/register', controller.register);
app.post('/auth/login', controller.login);
app.get('/auth/logout', controller.logout);
app.get('/api/treasure/dragon', treasure.dragonTreasure);
app.get('/api/treasure/user', treasure.getUserTreasure);
app.post('/api/treasure/user', treasure.addUserTreasure);
app.get('/api/treasure/all', treasure.getAllTreasure);


app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
