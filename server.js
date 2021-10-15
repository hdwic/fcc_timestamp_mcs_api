// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


//requiring dotenv
require('dotenv').config();

//requiring iso-date-validator
const {isValidDate} = require('iso-datestring-validator')


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/', function(req,res) {
	const datez = new Date()
	let outputDateMS = Date.parse(datez)
	
	let outputJson = 
			{
				unix 	: outputDateMS,
				utc 	: datez.toUTCString()	
			}
	res.json(outputJson)
	
})



app.get("/api/:date", function (req, res) {
	
	let input =  req.params.date.toString()
	let output;

		const func = (input) => {
    	// let output ;
    	let dateMS = Date.parse(input) 
    	let datecek1 = new Date(dateMS)
    	let datecek2 = new Date(parseInt(input)) 
    	let datecek3 = new Date(input)
		
    	output = 
    		{
        		input : input, 
        		dateMS : dateMS, 
        		datecek1 : datecek1, 
        		datecek2 : datecek2, 
        		datecek3 : datecek3
    		}
    
    		console.log('========================================')
			console.log(`input : ${input}`)
			console.log(`typeof output.dateMS : ${typeof output.dateMS}`)
			console.log(`output.input.toString() : ${output.input.toString()} `)
			console.log(`Date.parse(datecek2).toString() : ${Date.parse(datecek2).toString()}`)
			console.log('========================================')

    return output

}
	

	
	func(req.params.date.toString())
	
		if (
		isNaN(output.dateMS) && 
		output.datecek1 == 'Invalid Date' && 
		output.datecek2 == 'Invalid Date' && 
		output.datecek3 == 'Invalid Date'
		)
			{
				
				let outputJson ={	error : output.datecek1.toString() }									  
				
				res.json(outputJson)
			}
	
	else  if (
		isValidDate(req.params.date.toString())
		)
			{
				let dateMS = Date.parse(input) 
    			let datecek1 = new Date(req.params.date)
				
				
				let outputJson = {
					unix : parseInt(dateMS),
					utc : datecek1.toUTCString()
									  
				}
				
				res.json(outputJson)
			}
	
	 else if (
		
		
		 (/^-?\d+\.?\d*$/.test(req.params.date))   //cek input if it contain only digit
		
	 )
			{
				let datecek2 = new Date(parseInt(req.params.date.toString()))
				let outputJson = 
					{
						unix : parseInt(req.params.date),
						utc : datecek2.toUTCString()
					}
				
				
				res.json(outputJson)
			}
	else {
		let outputJson = 
					{
						unix : Date.parse(req.params.date),
						utc : new Date(req.params.date).toUTCString()
					}
		res.json(outputJson)
	}			

})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
