const express = require("express")
const pool = require('../data/config');
const path = require("path");
const router = express.Router()

// Add Data
router.post('/', (req, res) => {
	if (req.session.loggedin) {
        if (req.body.content != '') {
   
            const inputContent = { 
                UserID: req.session.UserID,
                Task_Name:req.body.content,
                StatusID: 2,
                CreatedDate: new Date(),
                LastUpdate: new Date(),
                EndTaskDate: new Date()
            }
            pool.query('INSERT INTO Todolist SET ? ',inputContent, (error, result) => {
                            if (error) throw error;           
                            res.redirect('/users/'+ req.session.UserID)
                        });
        }else{
            res.redirect('/users/'+ req.session.UserID)
        }
    	
	} else {
		res.send('Please login to view this page!');
	}

});
//Update data
router.get('/edit/:id/:idrow', (req, res) => {
	if (req.session.loggedin) {
    	
        const id = req.params.id
        var Task_Name = req.body.content
        pool.query('CALL GetToDoListByUser(?)', id, (error, result) => {
			if (error) throw error;
			const arrayTask = result[0];
			const CountTask = result[0].length;     
			res.render("todoEdit",{data:arrayTask,idrows: req.params.idrow})
		});
	} else {
		res.send('Please login to view this page!');
	}
});

router.post('/edit/:id/:idrow', (req, res) => {
	if (req.session.loggedin) {
    	
        const idRow = req.params.idrow
        var Task_Name = req.body.content
         pool.query('UPDATE Todolist SET Task_Name = ? WHERE ID = ?',[Task_Name,idRow], (error, result) => {
                        if (error) throw error;           
                        res.redirect('/users/'+ req.session.UserID)
                    });
	} else {
		res.send('Please login to view this page!');
	}

});
//Deleta Data
router.get('/remove/:id/:idrow', (req, res) => {
	if (req.session.loggedin) {
    	
        const idRow = req.params.idrow    
         pool.query('DELETE FROM Todolist WHERE id = ?',idRow, (error, result) => {
                        if (error) throw error;           
                        res.redirect('/users/'+ req.session.UserID)
                    });
	} else {
		res.send('Please login to view this page!');
	}

});

module.exports = { router }