var AWS = require("aws-sdk");

// config aws iam account
AWS.config.loadFromPath("./config.json");
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

module.exports = {
  // copy file from all files bucket to clean bucket and than delete the file from all files bucket
  CopyCorect(fileName) {
    var params = {
      CopySource: `all-files-bucket/${fileName}`,
      Bucket: "clean-files-bucket",
      Key: fileName
    };
    s3.copyObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
      params = {
        Bucket: "all-files-bucket",
        Delete: {
          Objects: [
            {
              Key: fileName
            }
          ],
          Quiet: false
        }
      };
      s3.deleteObjects(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    });
  },
  // copy file from all files bucket to dirty bucket and than delete the file from all files bucket
  CopyUncorect(fileName) {
    var params = {
      CopySource: `all-files-bucket/${fileName}`,
      Bucket: "dirty-files-bucket",
      Key: fileName
    };
    s3.copyObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
      params = {
        Bucket: "all-files-bucket",
        Delete: {
          Objects: [
            {
              Key: fileName
            }
          ],
          Quiet: false
        }
      };
      s3.deleteObjects(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    });
  }
};
