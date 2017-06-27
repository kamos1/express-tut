const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({dest: '/tmp/'}));
app.use(cookieParser());

app.get('/index.html', (req, res) => {
  console.log('cookies', req.cookies);
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', (req, res) => {
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log('get', response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', (req, res) => {
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log('post', response);
   res.end(JSON.stringify(response));
})

app.post('/file_upload', (req, res) => {
  console.log(req.files.file.name);
  console.log(req.files.file.path);
  console.log(req.files.file.type);
  const file = __dirname + '/' + req.files.file.name;

  fs.readfile( req.files.file.path, (err, data) => {
    fs.writefile(file, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.files.file.name
        };
      }
      console.log('file_upload', response);
      res.end(JSON.stringify(response));
    });
  });
});

app.post('/', (req, res) => {
  console.log("got a POST request from the homepage");
  res.send('Hello POST');
})

app.delete('/del_user', (req, res) => {
  console.log('got a DELETE request from /del_user');
  res.send('Hello DELETE');
})

app.get('list_user', (req, res) => {
  console.log('got a GET request from /list_user');
  res.send('Page listing');
})

app.get('/ab*cd', (req, res) => {
  console.log('got a GET request from /ab*cd');
  res.send('Page Pattern Match');
})

const server = app.listen(8081, () => {
  const host = server.address().address
  const port = server.address().port
  console.log("app listening at http://%s:%s", host, port);
})
