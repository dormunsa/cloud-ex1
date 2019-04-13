var AWS = require("aws-sdk");
var slack = require("./slack");
var copyFiles = require("./copyFiles");

AWS.config.loadFromPath("./config.json");
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
var params = {
  Bucket: "all-files-bucket"
};
s3.listObjects(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else {
    let response = data.Contents;
    response.forEach(doc => {
      var params = {
        Bucket: "all-files-bucket",
        Key: doc.Key
      };
      s3.getObject(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
          let fileContent = data.Body;
          if (fileContent.includes("i am not good")) {
            slack.SendMessage(doc.Key);
            copyFiles.CopyUncorect(doc.Key);
          } else {
            copyFiles.CopyCorect(doc.Key);
          }
        }
      });
    });
  }
});
