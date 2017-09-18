var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = 'cPvzkyxcmbuMjW1VWQ1AIkLw8vFCzQNVMiCXSgVD';
qiniu.conf.SECRET_KEY = '2wgqlzpugDLgOWONqyjxGZW4ptKdkjPhrqrQEtKi';
//要上传的空间
var bucket = 'blog';

//上传到七牛后保存的文件名
//构建上传策略函数
function uptoken(bucket, key) {
  var options = {
    scope: bucket + ":" + key
  }
  var putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken();
}
//生成上传 Token
//要上传文件的本地路径
//构造上传函数
module.exports = uploadFile = (localFile,key) =>{
  var promise = new Promise(function(resolve, reject){
    var token = uptoken(bucket, key);
    var extra = new qiniu.form_up.PutExtra();
    var config = new qiniu.conf.Config();
    var formUploader = new qiniu.form_up.FormUploader(config);
    formUploader.putFile(token, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
        resolve(true)
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
    });
  })
  return promise
}
