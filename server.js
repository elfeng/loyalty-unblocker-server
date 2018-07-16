//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    fs      = require('fs'),
    bodyParser = require('body-parser');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

app.use(express.static('client/build_webpack'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  }
app.use(cors);

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

const getMongoURL = () => {
  let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
  if (process.env.DATABASE_SERVICE_NAME) {
    const mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    const mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    const mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    const mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    const mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    const mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
      mongoURL = 'mongodb://';
      if (mongoUser && mongoPassword) {
        mongoURL += mongoUser + ':' + mongoPassword + '@';
      }
      mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    }
  }
  return mongoURL;
}

var db = null;

var initDb = function() {
  const mongoURL = getMongoURL();
  if (db || mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
        console.log(err);
      return;
    }

    db = conn;

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.use((req, res, next) => {
    initDb();
    next();
});

app.post('/env', function (req, res) {
    res.json(process.env);
});

app.get('/test', function (req, res) {
    res.send('test1');
});

app.post('/book', function(req, res) {
    var col = db.collection('trip_details');
    col.insertOne({name: req.body.name,
        sailingCode: req.body.sailingCode});
    res.send('{ "status": "success" }');
});

app.post('/products', function (req, res) {
    if (req.body.Destination && req.body.CruiseLine) {
        db.collection('products')
            .find({Destination: req.body.Destination.trim().toLowerCase(), CruiseLine: req.body.CruiseLine.trim().toLowerCase()})
            .then(r => res.json(r));
    } else {
        res.send('{ "status": "error", "message": "missing request params" }');
    }
});

app.post('/initData', function (req, res) {
    db.collection('products').remove({});
    fs.readFile('json/products.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);

        db.collection('products').insert(json, function(err, doc) {
            if (err) throw err;
        })
    });
    fs.readFile('json/products2.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);

        db.collection('products').insert(json, function(err, doc) {
            if (err) throw err;
        })
    });
    fs.readFile('json/products3.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);

        db.collection('products').insert(json, function(err, doc) {
            if (err) throw err;
        })
    });
    res.send('{ "status": "complete" }');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
