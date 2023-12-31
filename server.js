
const express = require('express');
const sessions = require('express-session')
const path = require('path');

 
const app = express();
const PORT = 80
var tasks = []

var username = "Per"
var session;

var users = [
    {username: "Per", password: "123"},
    {username: "man", password: "1234"},
]

 
app.use(express.static('public')) // tilordner public mappe til vår app
app.use(express.json()) // tar i bruk json funksjon for app

app.use(sessions({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));
 
app.get('/', function (req, res) {
    if(req.session.username){
        res.sendFile(path.join(__dirname, 'public', 'chat.html'))
    }else{
        res.sendFile(path.join(__dirname, 'public', 'loginn.html'))
    }
    
});



function Authenticator(req, res, next){
    if(req.session.user){
        return next();
    }else{
        res.status(401).send('unauthorized')
    }
}


app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.password)
    
    const {username, password} = req.body;
    if (username && password){
    var user = users.find(u => u.username === username && u.password === password)
    if(user){
        console.log("rett inloggin")
        req.session.user = username;
        session = req.session
        session.username = req.body.username
        res.json({sucsess: true, username});
        
    }else{
        console.log("feil innlogging")
        res.status(401).json({sucsess: false, message: 'Invalid credentials'})
    }
    }
    
    
});


 

app.post('/ask', (req, res) => {
    var task = req.body.task;
    console.log(task);
    // her må vi sørge for at det klient sender, blir lagt til i task listen
    // tasks.push("vask bilen")
	if (task){
		tasks.push(task)
		console.log(tasks)
		res.json({sucsess: true})
	} else{
		res.json({sucsess:  false,
				message: "no task sent"})
	}

});


 app.get('/response', (req,res) => {
	res.json({tasks: tasks})
 })


app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index) // index er et param og henter linken
    if (index >= 0 && index <tasks.length) {
        tasks.splice(index, 1) // sletter en task fra liste
        res.json ({sucsess: true})
    }else{
        res.json({sucsess: false})
    }

})



app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 