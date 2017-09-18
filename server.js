var uploadFile = require('./uploadimg');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var mysql = require('mysql');
var express = require('express');
var app = express()
var multipartMiddleware = multipart()
var dboption = {
  host: "localhost",
  user: "yoke",
  password: "218906",
  database:"mydb"
};
var insert = (res) =>{
  var con = mysql.createConnection(dboption)
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO blog (title,tag1,tag2,tag3,author,article,date) VALUES (?,?,?,?,?,?,?)";
    var tag = [null,null,null]
    for( let i in res.tag){
      tag[i] = res.tag[i].label
    }
    con.query(sql,[res.title,tag[0],tag[1],tag[2],res.author,res.content,res.date],function (err, result) {
      if (err) throw err;
      console.log("insert!");
    });
  });
}
var select = () =>{
  var promise = new Promise(function(resolve, reject){
    var con = mysql.createConnection(dboption)
    con.connect()
    con.query("SELECT * FROM blog", function (err, result, fields) {
      if (err) throw err;
      resolve(result)
    });
    con.end()
  })
  return promise
}
var response = {}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/insert', function (req, res) {
  console.log("success");
  res.json({data:'success'});
  insert(req.body);
});
app.get('/select',function(req,res){
  select().then(function (value) {
    res.json({result:value})
  }, function (value) {
    return value
  });
})
app.post('/upload',multipartMiddleware,function(req,res,next){
  if(Object.prototype.toString.call(req.files.img) == "[object Object]"){
    uploadFile(req.files.img.path,req.files.img.originalFilename).then(function(value){
      res.json({
        error:0,
        data:[`http://owckf5imo.bkt.clouddn.com/${req.files.img.originalFilename}`]
      })
    },function(value){
      return value
    })
  }else{
    for(let img of req.files.img){
      uploadFile(img.path,img.originalFilename).then(function(value){
        res.json({
          error:0,
          data:[`http://owckf5imo.bkt.clouddn.com/${req.files.img.originalFilename}`]
        })
      },function(value){
        return value
      })
    }
  }
})
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
});
