var mysql = require('mysql')
var express = require('express')
var bodyparser = require('body-parser')
var request = require('request')
var session = require('express-session')
var path = require('path')
var hbs = require('hbs')

var app = express()

var url = "https://api.mitrevels.in/categories"

app.set('view engine', 'hbs')

app.use(bodyparser.urlencoded({extended: true}))

app.use(bodyparser.json())

var publicDir = path.join(__dirname, '../public')
var viewPath = path.join(__dirname, '../views')

app.set('views', viewPath)

app.use(express.static(publicDir))

request({url: url, json: true},(err, response)=>{
	if(err)
	{
		console.log(err)
	}

	app.get('/',(req, res)=>{
		res.render('portal',{
			id: response.body.data[0].id,
			name: response.body.data[0].name,
			type: response.body.data[0].type,
			description: response.body.data[0].description,
			id1: response.body.data[1].id,
			name1: response.body.data[1].name,
			type1: response.body.data[1].type,
			description1: response.body.data[1].description,
			id2: response.body.data[2].id,
			name2: response.body.data[2].name,
			type2: response.body.data[2].type,
			description2: response.body.data[2].description,
			id3: response.body.data[16].id,
			name3: response.body.data[16].name,
			type3: response.body.data[16].type,
			description3: response.body.data[16].description,
			id4: response.body.data[13].id,
			name4: response.body.data[13].name,
			type4: response.body.data[13].type,
			description4: response.body.data[13].description,
			id5: response.body.data[14].id,
			name5: response.body.data[14].name,
			type5: response.body.data[14].type,
			description5: response.body.data[14].description,
			id6: response.body.data[18].id,
			name6: response.body.data[18].name,
			type6: response.body.data[18].type,
			description6: response.body.data[18].description,
			id7: response.body.data[19].id,
			name7: response.body.data[19].name,
			type7: response.body.data[19].type,
			description7: response.body.data[19].description,
			id8: response.body.data[20].id,
			name8: response.body.data[20].name,
			type8: response.body.data[20].type,
			description8: response.body.data[20].description
		})
	})
})

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Shubh_rmcf07",
	database: "TT19"
})

con.connect((err)=>{
	if(err)
	{
		throw err
	}

	console.log("Connected")
})

con.query("CREATE TABLE student (name varchar(20), regno int(10), mobile int(12), email varchar(50), Preference1 varchar(50), Preference2 varchar(50), Preference3 varchar(50))",(err, data)=>{
	if(err)
		throw err
	console.log("Table created!")
})

app.post('/auth',(req, res)=>{
	var name = req.body.uname
	var regno = req.body.regno
	var mobile = req.body.mobile
	var email = req.body.email
	var Preference1 = req.body.Preference1
	var Preference2 = req.body.Preference2
	var Preference3 = req.body.Preference3

	if(name && regno && mobile && email && Preference1 && Preference2 && Preference3)
	{
		var user = {
			name: name,
			regno: regno,
			mobile: mobile,
			email: email,
			Preference1: Preference1,
			Preference2: Preference2,
			Preference3: Preference3
		}

			con.query("SELECT * FROM student WHERE regno = ?", user.regno, (err, data)=>{
				if(err)
					throw err

				if(data.length>0)
					res.send("User already registered!!")

				else
				{
					con.query("INSERT INTO student SET ?", user, (err, response)=>{
						if(err)
							res.send(err)
						res.send("Registered Successfully!")
					})
				}
			})

	}

	else
	{
		res.send("Enter all fields")
	}
})

app.listen(8080,()=>{
	console.log("Connected")
})
