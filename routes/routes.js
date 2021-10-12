const express = require("express")
const pool = require('../data/config');
const path = require("path");
const router = express.Router()
var username;
var id;

//Login form
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
});

//Thoat dang nhap
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.sendFile(path.join(__dirname + '/login.html'));
  });
   
//Check Password and username
router.post('/auth', function(req, res) {
	 username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		pool.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {

			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.UserID = results[0].UserID;
			
				res.redirect('/users/'+ results[0].UserID);
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


//Trang chinh sau khi dang nhap
router.get('/users/:id', (req, res) => {
	if (req.session.loggedin) {
    	 id = req.params.id;
		pool.query('CALL GetToDoListByUser(?)', id, (error, result) => {

			if (error) throw error;
			const arrayTask = result[0];
			const CountTask = result[0].length;     
			// console.log(arrayTask);
			res.render("todo",{data:arrayTask})

		});
	} else {
		res.send('Please login to view this page!');
	}

});



module.exports = { router }

