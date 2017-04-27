var fs = require('fs'),
    xml2js = require('xml2js');

//let relativePath = "tools/xml2Json/";
let relativePath = "/xml2Json/";
let target1 = "TICDevice";
let target2 = "Model-8MW-Mk0AB_v204a";
let target3 = "TestSuite-Generic-SmokeDetection_v204a";
let targetPath = __dirname + relativePath + target3;

var parser = new xml2js.Parser();
fs.readFile( targetPath+'.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        //console.dir(result);
        console.log(JSON.stringify(result, 0, 2));

        fs.writeFile(targetPath+'.json', JSON.stringify(result, 0, 2), function (err) {
            if (err) return console.log(err);

        });

        console.log('Done');
    });
});
