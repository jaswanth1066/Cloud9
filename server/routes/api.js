const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME} = require("../config")
const express = require("express");
const route = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

route.post("/getInfo", async (req, res) => {
    try {
        const userName = req.body.userName
        var userParams = { 
            Bucket: AWS_S3_BUCKET_NAME,
            Prefix: userName+'/'
           }
           var publicParams = { 
            Bucket: AWS_S3_BUCKET_NAME,
            Prefix: 'Public/'
           }
        const data = await s3.listObjects(userParams).promise();
        const publicData = await s3.listObjects(publicParams).promise();
        var results = [];
        for(const content of data['Contents']){
            results.push(content);
        }
        for(const content of publicData['Contents']){
            results.push(content);
        }
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching the payments.");
    }
});

route.post("/upload", async (req, res) => {
    try {
        //console.log(String(req.body.privacy) === 'Private')
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json(err)
            } else if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
        const filename = req.file['originalname']
        const fileContent = fs.readFileSync(filename)
        const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: (String(req.body.privacy) === 'Private' ? req.body.userName+'/' : 'Public/') + filename,
        Body: fileContent
        }
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            fs.unlinkSync(filename);
        });
        res.status(200);
     })
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching the payments.");
    }
});

const fileNameEdit = (name, user) =>{
    const nameString = String(name)
    if(nameString.startsWith('Public/')){
      return nameString.substring(7, nameString.length)
    }
    return nameString.substring(user.length+1, nameString.length)
  };

route.get("/download", async (req, res) => {
    try {
        const filePath = req.query['key'];
        console.log(req.query)   
        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: filePath
            };
        s3.getObject(params, (err, data) => {
            if (err) {
                console.error(err);
            }
            let localPath = fileNameEdit(filePath, req.query['user']);
            fs.writeFileSync(localPath, data.Body);
            res.download(localPath, localPath, function(err) {
                if (err) {
                  console.log(err); // Check error if you want
                }
                fs.unlinkSync(localPath);
              });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching the payments.");
    }
});

// route.get("/search", async (req, res) => {
//     try {
//         const searchKey = 'o';
//         var params = { 
//             Bucket: AWS_S3_BUCKET_NAME,
//             Delimiter: '/'
//            }
//            var results = [];
//            const data = await s3.listObjects(params).promise();
//            for(const content of data['Contents']) {
//             var fileName = content['Key'];
//             console.log(fileName + ", "+ searchKey)
//             console.log(fileName.includes(searchKey));
//             if(fileName.includes(searchKey)){
//                 results.push(fileName);
//             }
//             console.log(results)
//         }
//         console.log(data)
//         console.log(results);
//         res.status(200).send(results);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error while fetching the payments.");
//     }
// });



module.exports = route;
