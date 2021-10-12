//Khởi tạo server
const express = require("express");
var session = require('express-session');
const { router } = require("./routes/routes");
const  routerTodo  = require("./models/todoTask");

const app = express();

app.use("/static",express.static("public")) // Dùng để lấy file style
app.set("view engine", "ejs"); // Dùng để view
app.set("views","./views");

app.use(express.urlencoded({ extended: true })); // Vì cần cho phương thức POST
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use('/',router)
app.use('/users',routerTodo.router)




app.listen(3003, () => console.log("Server Up and running"));