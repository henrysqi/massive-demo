var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var db = massive.connectSync({
  connectionString : 'postgres://postgres:pgadminpass@localhost/massive_demo'
});

console.log(db)

var app = express();
app.use(bodyParser.json());

app.set('db', db);

var port = 3000;

app.get('/incidents', function(req, res) {
	console.log(req.query.cause);
	
	if(req.query.cause){
		db.get_incidents_by_cause([req.query.cause], function(err, incidents){
			if (err){
				res.status(500).send(err)
			} else {
				res.send(incidents)
			}
		})
	}
	else {
		db.get_all_incidents(function(err, incidents){
			if (err){
				res.status(500).send(err)
			} else {
				res.send(incidents)
			}
		})
	}
});

app.post('/incidents', function(req, res) {
  console.log('POST /incidents');
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
