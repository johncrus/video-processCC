var express = require('express');
var router = express.Router();
var fs = require('fs');

const Storage = require('@google-cloud/storage');
var bucket="simple-storage-11223344.appspot.com";



function downloadFile(bucketName, srcFilename, destFilename,res) {
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
    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: destFilename,
    };
    storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options)
        .then(() => {
            console.log(
                `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
            );
            res.download(destFilename);

        })
        .catch(err => {
            console.error('ERROR:', err);
            res.send("Could not download the file");
        });
    // [END storage_download_file]
}
router.post('/:name', function(req, res){
    const filename=req.params.name;
    console.log(filename+"----------");
    downloadFile(bucket,filename,"../tmp/"+filename,res);

    // Set disposition and send it.
});

module.exports = router;