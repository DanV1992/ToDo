var http = require('http');
var fs = require('fs');
//var express = require('express');
//var path = require('path');

//app.use(express.static(path.normalize(__dirname) + '/public'))
//404 response
function send404Error(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: Page Not Found");
    response.end();
}

function onRequest(request, response){
    if (request.method == 'GET' && request.url == '/'){
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);

}else {
    send404Error(response);
}

}

http.createServer(onRequest).listen(3000);
console.log("Server is now running");
