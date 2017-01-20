var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();
var path = require('path');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// this is cors this allows my angular app to call this node backend even though they are both on local host 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// here I am calling multer to get the filename of the file I am serving up specifying what folder I want it to go in
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        //console.log(file); 
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).array('uploads');
// this app.post calls the post method this is where I will upload the file
app.post('/upload', function (request, response) {
    upload(request, response, function (err) {
        if (err) {
            //console.log(request); 
            console.log(err);
            return;
        }
        recievedFile(response);
        //console.log(request.file);
        //response.end('Your file Uploaded'); 

    })
});
app.post('/json', function (request, response) {

    fs.readFile('./uploads/Video.json', function (err, data) {
        if (err) {
            throw err;
        }
        if (data == "" || data == null) {
            appendData(request.body, response);
        }
        else {
            writeData(request.body, data, response)
        }
    });
    function appendData(req, res) {
        var obj = {
            SopVideo: []
        }
        obj.SopVideo.push(req)
        var json = JSON.stringify(obj);
        fs.appendFile('./uploads/Video.json', json);
        fs.close;
        recievedFile(res);
        //res.setHeader('Content-Type', 'application/json'); 
        //res.send(JSON.stringify({SopVideo: "recieved"})); 
    }

    function writeData(req, data, res) {
        var obj = {
            SopVideo: []
        }
        obj = JSON.parse(data);
        obj.SopVideo.push(req);
        var json = JSON.stringify(obj);
        fs.writeFile('./uploads/Video.json', json);
        fs.close;
        recievedFile(res);
        //res.setHeader('Content-type', 'application/json');
        //res.send(JSON.stringify({SopVideo: "recieved"})); 

    }

});
function recievedFile(res) {
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({ SopVideo: "recieved" }));

}

app.get('/getJsonData', function (req, res) {
    fs.readFile('./uploads/Video.json', function (err, data) {
        if (err) {
            throw err;
        }
       var obj; 

       obj = JSON.parse(data); 
       res.send(obj); 
       fs.close; 
    });
});

app.get('/RapVideo', function(req, res) {
 res.sendFile(path.join(__dirname + '/test/videotest.html'))
});

app.use(express.static('public')) 

// my app is listening on localhost port 8080 for the post to be called
var server = app.listen(8080, function () {
    console.log('Listening on port ' + server.address().port)
}); 
