
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { exec } = require('child_process');


const speech = require('@google-cloud/speech');
const video = require('@google-cloud/video-intelligence').v1;
const Storage = require('@google-cloud/storage');
var bucket="simple-storage-11223344.appspot.com";
const speechint = new speech.SpeechClient({
    key:{
        "type": "service_account",
        "project_id": "simple-storage-11223344",
        "private_key_id": "4d1711d99089b8ace731f265fd04e21004cd66b1",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+rQ15A3Gx2VV4\nMaEOcu8d24xpSs0pNY+Wwg3q6mwNO94HKXI+GrVCPE8bxjmfo50cz2VRpQsyThOk\nMos4mlu3yN2L6B7l6DjPUzsxkeohalV7FMdPgCG3uFAI3pIvDUMFCHxETbB1tDXr\nUZ4GEoqxvD020XqkFwER7HN4F1gMEAtpLalSs55tzpxq3DiOsfT0UELwrAxG6bGl\nvLdcsYAvImjTHTVdSwxbuVkht7Oj5hXF2eVHp3v4Tw4yafAqtlmn/SiUkTZuMTlU\nMVwqNJ0JT8Hzjvn3MvIUlNPsgQcRlZD0HSepfLQ4cCza001Hj2x9oi+AYm2jUUg7\nL/IkD7iJAgMBAAECggEAAefysyebyLh4lGChoKZ5ObIOxaQt6BgtGOeUcklY3mp/\nahCp39FOR8zYyRkqjQwah1XS6FWnJp/1bg4jymNvoIcRYONHgMqZG8h0FmckISSi\nGV6ALg0kuSSOZ0JLUY1XQsr+jAO/THPqWJF6rAqeKI/uSDigmliRBgv4LQaFtqwj\nd9v0lsqPglt85YaVC4C8jFQvZ12M33RfVETuu5t6bSVh5487JTOo24PznDZSSg3z\n8RiEhqapbD/ykybDjq07eCQd9hsxo46dNVW3PLkkLcjuyqI6Rf+3ELSRiVnDzfHD\nxSGqr3kzu0zxrsq8BLnSBmnuO5rR5VDEQaUeYIhK8QKBgQDi/TDmTPxb18XUPvd+\nGwXIpVu+UVgB0ZtEEgb7eMsF2+Z3z1P1AmGaGPJuWw9WeekO9gd8/VqOIkEoi9TN\nriuLC/x0B80cXlzmNJ2dx8yjGg22vweL2QjOuoSaiKLRPqZqP6K4mAC+VBoO1uvm\nfnBY8e31YEtyc/hj8FUl9HlukQKBgQDXC74Qcae1HMBwon+8ndzmrYbdy3QvlDo9\n2Snv2K5XTZgLagQURhUK1ceAxAv1qOR1bZvyHZULkZ+TEBpzWWgeU3tqEhpQ9sU5\nsdnCm+Vmvh/e7NDuJsQTEYYwiCPmtb8NWIbQgmkTJkIY19Qh+kYzi7ip3s+3Fw5s\nQ6yhPYoWeQKBgDbqCB1/PII/plWd0iRJB1IuZw6ZAVCXVBfYwKWv6HYHaC9OEkKx\nC8nLBUObdg92uOJstQ0RAgpm0RqtEZOc8l3WTYIIrR+S2Ki8y/Dy+FfxIqY2eu3j\nWNUinJgCPFmg7YPA124PIAbrs84pQrLlnep2xRna7QXIdqw+5WqkRYhxAoGARw9C\nRvzHhjlx/cY0n4cqr683maLZSb+ZX0abbP4U3hRt4ZeusWRXH7V0r0AZE5wzofoO\nRfswfRopuNbhZqxsk1jSt0I0H/zrPx1d78jEDSdWMLvgblGxCPwJc5AJDPuRnj9a\njRwKzKEfxkXLe07QU8gfxUIzMTUVNwFF0iIbt0ECgYEApb+R0NS6eRid3yHhZ9Eh\nsRW6W56/+C7E5NuAmuLGywwHy5M3ghC0qQxO7lVpxS4WlFydviNNi2317CRKprFK\n8tpm+UPK0s6Ca7Bc33p+zSXDaf28hTaHx93LlOV8GjvJnVyDUwc79cgx5GEHX2He\nY5hPXv6tv32+PhWk8jR4dLI=\n-----END PRIVATE KEY-----\n",
        "client_email": "audiorec@simple-storage-11223344.iam.gserviceaccount.com",
        "client_id": "101717656391478041129",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/audiorec%40simple-storage-11223344.iam.gserviceaccount.com"
    }

});
const videoint = new video.VideoIntelligenceServiceClient({
    key:{
        "type": "service_account",
        "project_id": "simple-storage-11223344",
        "private_key_id": "869ca00d525f91bd552a2b1221452aaee29af2bb",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCr40cJYl+k4dAi\nrFBya6eh9j2tbtwg4rt/JdxssNzHv1i+Z1MFASI8CIl2hHC+fcrH+/dRuL1Uz0tu\nIZNULwmj8DmqGDPE5/bR3k9VdB1uf6IwEhw/HoQ+BgFEO35FMX48mOsL28caBrPL\nDSHwPu+Fgcm77tnvJPTPIz+Sj3QYYiyVnHGd7/XbOAssMO7+fbx2CLgBBPltDzpW\nqZyzzdAPkIM/ZI62yEDUe67SaTLm6rvY3hNyD7uVjb9uWO7+iEs6Fjz70dgV+/CX\n30vEsXDRAxWGDZE05HcU5SgJ78bAmZKiCVzRR7+So/MW5AiZj/Vqag4aPZC99KRP\nmWtSdX+rAgMBAAECggEAPksM6Iq9TN0FeDtooD8BroG2Eo+VuVlSSB8phj6GlOF0\nwPRjMvIZPRZ+8vPGhFLEVbusAvLnsr+5f30tjpnJbZ9W1p0UzeyfF6nwqHB/Zhdd\naPx3PizKEkxM0zSYa20nacClllOdEYKSUCk/PnkghwrlWHWUh8Wl7xfAJ1ZT5a29\ngeAJ1FxCqkHK/B776D63TWbroeNk0v9HRUa6d0aicE2ah0sX8BnHYsNcqlaf6G++\nSfBQIWA+NSuoLV/+KWgwQXL7Ee+if+c0RuSnnFy/OV5EV4UJxs3U1pLnH2+CcFGm\niCRc4ugHq6AQuHf9035uYpAO+nqBokeoszG5tvXCiQKBgQDso+LHX76uHplQGs7Z\nSc5DMHX7nUjXPIUQuNd79PBjzCTYLCkEAt6BnBeW8qTe+c5tLxBb4WSFbAZNN0fB\nxmHgWK0vzzsjjizh+Hb2zTf5b4J/e4VmKRzi7N7c7d6nrQWhDy+S3HsEwxsr07+h\nPtKBVRpLpwlgi+ZKp/9B9gXxrwKBgQC58z04PsuNck7kTq5HFGGHTdlCW4g8+xEF\nKx24Y11+/Hyiq0Rue4trSweb8joy47Rn0t+6J8H4LnIO0MQ+p5XLmY7xa6Kh3fxu\nwUj7jFJVhj2qYei3/L9x4FmzXcmNtXLHowJDBzXV244e6wJyw35TOv/JwIYHNQyg\nORt2G3q8xQKBgQC44hY1VO3CVi/MMRW5GHvpbLxROIKHf0YrWW8p7qW+IuoKZv4o\nnyE+vDiF+8+qUhvgnCu4zXFe+JY3z9/lWlxwDnhI6Sy4S8VvS1OO4alA3clkVppT\nxf1GonBAxiv2byz9t8KgiFgo0VKyPD70+QM4fsgLoVanMsZbP8QjwdbFCwKBgAEO\nNGbBVH51C6WYHL0ijHssIfOSeW9/LVWOLRkC12EFJd/2gOjvopb1UhG8ikAHstp0\nA/kWiK9T9CnJXZPNd7g0Iu+T4NRyYiBu0G89GKqLnIX/EEcbFCsdTuUJvz8irIgd\nkMG4pMGWAXSDePwVx/3I8/K9OQWJc4zlRhahiUzRAoGABzfuCNA4UuryGV9cEkoK\ncSHgtaspK2ZMA0AedheA9mZlcb7jgw7P8QinCI1qKcHeyQL/mPG1h8BgHqCG9lnQ\nd1c4pWrXXDhrhVi3sPCv26yw7dE5Ec3h3ofa5B3GH16xZePIevvJBHJedJbtA9vf\nKi7ia+oBF40BqWqy/Gx1guQ=\n-----END PRIVATE KEY-----\n",
        "client_email": "videoint@simple-storage-11223344.iam.gserviceaccount.com",
        "client_id": "112247653427627560631",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/videoint%40simple-storage-11223344.iam.gserviceaccount.com"
    }

});
const storage = new Storage({
    key:{
        "type": "service_account",
        "project_id": "simple-storage-11223344",
        "private_key_id": "8d26c2a5ec73e706f242ed98ff28a798fc5dc69b",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChJgQNV8TJ2fX2\nNtHR4bsezTMYKWWG3r156IMWsKPPJu3uH4DAhM6wHHwkQ0LCLx5UAbA9VTY19LgB\nEN48bTqJmYhs4B5oADA9nnI0eyrnW4/xGykLX1XCxr6d7Q0k2IKydfBvkdrkwkvL\ngXM/oEPWTAi7pLM1a0R/ZlNzu8IFh3nLmgwmVJC9HjFgR7pBYqNPVvxK1GBhQtZY\nNwAENCVfOpm8pAUcTHRtSaOZ3FuvBBJ9G0Opw5wQwLEH7HPN8fISzMgnt8vppQXi\njPi21gj+BcvmYZl4yDNUBMuOQA6jW4MfR1zyz9+/2jDqEeYstDF3XnOgndqZjOsb\nJKiE0uZVAgMBAAECggEAIkvIr31HMq1aUTsEBy7LJ+hEkEcZJi3H9gbDxWO1DSyM\nFTJrsK1jHqyFSCNvdQvZoMfWNgtpVOze700jewlFHM1J8V/2YKxvl+GdjSlMbX45\nYXcmEldJFYG+RjaR5k5U7H24vMn2I9rtDiPf/wHRBi3a6vKHuF36r0F8D8S9K3c9\nj/LNKOeZldKjIEzAbDaRq4c+ZHgJMneNhZp/a12CU7g6oBagI9q358+2CPLs46DL\nncVDAdUx1PeegktVBuOANimKyndn23l6r37QRUaBNzhXTvEoZQ0g1F80w7C4a6Ft\nxuvrxSuMLMIW7CIqd4CN1zzkOONy/DIimR7Dfy1EWQKBgQDg2mwZCQ29iIMy57yO\nVGWRQGJeyR8VWX1jaqRROAF7H6r/FnBeVPjVQ1PVoCMx+BTFii0GGDmiyZuBlon+\nSRHJkAVTmGNbeWUbwKL6ncoFNF4G2tLeeBupo+RWczx50Ap7R8cxh8U/N0YAFQLB\nnMfDDprYdWSvzfMnrpG7l0mSHQKBgQC3eItZAjMNmdDQaYEtn8gdvmHR2CrBy7wR\n9Irp+WH5XVES+my15fU1HNpmZSa3tzA3Bzk0BJtkuaBAMoK0w3xli3hDJ57N9u5q\nEizhLwjpwLKMNfFQX+QAeya6PRM57c8bgH0mwlLgb/FSQXr/4NLvgeaHxJQsnUNi\nDztEqYBvmQKBgCYDx5LT/Qa2Nbg9hZtqmWFdSURNLHwnjRNpzC4PEfEHAZnu6UCJ\njShBIcNUN58TGi/rlIEbR2NGQow+L0ZWhDNXrg7cDLBCbd2rS+KjGqyWle8Cv/Ps\nyoB7vPcAtJDDo4IEOKEfGzH83lDVPIoPP5ayuWsvLb6rSxjCYtEcWsvhAoGAPYZN\n7F5BcoknLgyDRiJzwA2szerYg75nZfoEb2uygCXb3ypdNC5WKSZw0q+O6UKkB4AD\nnb8BwShCZeTKUgXP/FllzddGeLkawDUyGZ1lNsXo2f3o21QcqFCj7wY2IVHvBsDy\ntwGpOxwu56+PqKji83AzN0ojikZ+Zy7GaEMTD9kCgYBJisUIDfSl1PEZwml/wmKG\nX6aIr0PYEm5CpmICVAGfsWPvmDDBsJxjvQR2vHjIOoUS8O81wQQYkcVFonKUCFh5\nwkV6Gk5xmJmaKO67u7yO8qNisPF9JsID149oVcc8k8DBjf54jwtUSZjPSjfUiezf\nGIkMdzhrTivB5nAHlaSfjw==\n-----END PRIVATE KEY-----\n",
        "client_email": "simple-storage-11223344@appspot.gserviceaccount.com",
        "client_id": "114660218304570790181",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/simple-storage-11223344%40appspot.gserviceaccount.com"
    }

});

function clear(filename){
    console.log(filename);
    fs.unlink("../tmp/"+filename.slice(0,-4)+".mp3", function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });
    fs.unlink("../tmp/"+filename.slice(0,-4)+".mp4", function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });
    fs.unlink("../tmp/"+filename.slice(0,-4)+".flac", function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });
}
function labelRequest(path,res,filename){
    const file = fs.readFileSync(path);
    const inputContent = file.toString('base64');
    const request = {
        inputContent: inputContent,
        features: ['LABEL_DETECTION']
    };
    var maxconf=0;
    var resultlabel = "unknown";
    var fullresult="";
    fullresult+=filename+"\n";
    videoint
        .annotateVideo(request)
        .then(function (results) {
            const operation = results[0];
            console.log('Waiting for operation to complete...');
            return operation.promise();
        })
        .then(function(results){
            // Gets annotations for video
            const annotations = results[0].annotationResults[0];

            const labels = annotations.segmentLabelAnnotations;
            labels.forEach(function(label) {
                console.log("Label "+label.entity.description);
                label.segments.forEach(function(segment)  {
                    console.log("\tConfidence:"+segment.confidence);
                    fullresult+="<p>"+label.entity.description+"  confidence: "+segment.confidence+"</p>";
                    if (segment.confidence>maxconf){
                        maxconf=segment.confidence;
                        resultlabel=label.entity.description;
                    }
                });


            }
            );
            console.log(resultlabel);
            var mp3path="../tmp/"+filename.slice(0,-4)+".mp3";
            var wavpath="../tmp/"+filename.slice(0,-4)+".flac";
            var cmd1 = "avconv -i "+path+" -vn -f mp3 "+mp3path;
            var cmd2 = "avconv -i "+path+" -vn  -ac 1 -ab 192000 -f flac "+wavpath;
            console.log(cmd1);
            console.log(cmd2);
            exec(cmd1, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    console.log("not succes convert to raw");
                    res.send(fullresult+"Uploaded "+filename+"but error converting to mp3");
                    clear(filename);
                }else{
                    exec(cmd2, (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            console.log("not succes convert to raw");
                            res.send(fullresult+"Uploaded "+filename+"but error converting to raw");
                            clear(filename);
                        }else{
                            console.log("succes convert to raw");
                            uploadFile(bucket,wavpath,mp3path,res,fullresult,filename);

                        }

                    });

                }

            });
        })
        .catch(function(err)  {
            console.error('ERROR:', err);
        });

}
function uploadFile(bucketName, rawpath,mp3file,res,fullresult,filename) {
    storage
        .bucket(bucketName)
        .upload(mp3file)
        .then(function ()  {
        console.log(mp3file+" uploaded to "+bucketName);
            const config = {
                encoding: 'FLAC',
                languageCode: 'en-US',
            };
            const audio = {
                content: fs.readFileSync(rawpath).toString('base64'),
            };
            const request = {
                config: config,
                audio: audio,
            };
            speechint
                .recognize(request)
                .then(data => {
                    const response = data[0];
                    const transcription = response.results
                        .map(result => result.alternatives[0].transcript)
                        .join('\n');
                    console.log(`Transcription: `, transcription);
                    const buffer=fullresult+transcription;
                    res.render('data',{text: buffer, filename:filename.slice(0,-4)+".mp3"});
                    clear(filename);

                })
                .catch(err => {
                    console.error('ERROR:', err);
                    res.send(fullresult+"error transcription");
                    clear(filename);
                });
})
.catch(function(err) {
        console.error('ERROR:', err);
    res.send(fullresult+"Error upload");
    clear(filename);
});
}

router.get('/',function (req, res, next) {
   res.render('index',{title: "Upload form"})
});
router.post('/',function (req,res,next) {
   if(req.files){
      var file=req.files.filename;
      var filename=file.name;
      var filepath="../tmp/"+filename;
      file.mv(filepath,function (err) {
         if(err) {
            console.log(err);
            res.send("error while uploading");
         }else{
             labelRequest(filepath,res,filename);


         }
      });
   }
});

module.exports = router;
