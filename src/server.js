var http = require('http');
var textParameter = "/?text=";
var exec = require('child_process').exec;


// Create a server
try {
http.createServer( function (request, response) {
  function oputs(error, stdout, stderr) { 
  console.log(stdout) 
  }
  console.log("received request");
  console.log("request[url]="+request.url);
  request.on('end', function() {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("OK" + "\n");
    response.end();
  })
  if(request.url.indexOf(textParameter) != -1) {
    var parameters = request.url.substring(textParameter.length).split('&');
    if(parameters.length) {
      var spoken = parameters[0].replace(/_/g," ");
      var token=parameters[1].split("=")[1];
      console.log("spoken="+spoken);
      var who = spoken.match(/kyler|ian|enz|ander|julian/gi), name=null, color=null;
      if(who && who.length === 1) {
        console.log("matched "+who[0]);
        switch(token) {
          //kyler
          case "60fdfebd7ee80beba3c39ef5bb6eaf86": 
	  default:
            color="red"
	    break;
         }
         switch(who[0].toLowerCase()) {
           case "ander":
             name="xander"
            break;
          case "ian":
          case "enz":
            name="ian"
            break;
          case "julian":
            name="julian"
            break;
          case "kyler":
          default:
            name="kyler"
            break;
       }
       var onoff = spoken.match(/\son|off\s/gi), command = null, power="on";
       if(onoff && onoff.length === 1) {
         power = onoff[0].trim().toLowerCase();
       }
       switch(power) {
         case "off":
           command = "/usr/local/bin/lifx -o "+name;
           break;
         default:
         case "on":
           command = "/usr/local/bin/lifx -c "+color+" "+name;
           break;
       }
       console.log(command);
       exec(command, oputs);
      } 
      console.log("after exec");
    }
  }
}).listen(8091);
} catch(e) {
  console.log('caught exception');
}

// Console will print the message
console.log('Server running at http://127.0.0.1:8091/');
