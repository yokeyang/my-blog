//init
var mysql = require('mysql');

var option = {
  host: "localhost",
  user: "yoke",
  password: "218906",
  database:"mydb"
};
function dosomething(){
  var con = mysql.createConnection(option);
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE blog (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,tag1 VARCHAR(255),tag2 VARCHAR(255),author VARCHAR(255),date DATE,content TEXT(2000)) UNION ALTER TABLE blog DEFAULT CHARACTER SET utf8mb4";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
}
