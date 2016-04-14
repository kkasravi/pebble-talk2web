var http = require('http');
var textParameter = "/?text=";

// Create a server
http.createServer( function (request, response) {
   console.log("received request");
   console.log("request[url]="+request.url);
   if(request.url.indexOf(textParameter) != -1) {
     var parameters = request.url.substring(textParameter.length).split('&');
     if(parameters.length) {
       var spoken = parameters[0].replace(/_/g," ");
       console.log("spoken="+spoken);
     }
   }
   var body = ["OK"];
   request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response.end(body);
    })
}).listen(8091);

// Console will print the message
console.log('Server running at http://127.0.0.1:8091/');