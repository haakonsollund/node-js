
const express = require('express');
const path = require('path');
 
const app = express();
const PORT = 80
 
var tasks = ["ta oppvasken", "gå med søppla", "abfadfbdfb "]


 
app.use(express.static('public')) // tilordner public mappe til vår app
app.use(express.json()) // tar i bruk json funksjon for app
 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
 
app.get('/hei', function (req, res) {
    res.send("Hei på deg!");
});
 
app.post('/ask', (req, res) => {
    var task = req.body.task;
    console.log(task);
    // her må vi sørge for at det klient sender, blir lagt til i task listen
    // tasks.push("vask bilen")
	if (task){
		tasks.push(task)
		console.log(tasks)
		res.json({verdier: tasks})
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