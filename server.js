var paperboy = require("paperboy"),
    path = require("path"),
    Seq = require("seq"),
    fs = require("fs"),
    http = require("http"),
    sys = require("sys"),
    fileServer = null,
    arbys_head = path.normalize("./wrap/head.html"),
    arbys_foot = path.normalize("./wrap/foot.html"),
    arbys_main = path.normalize("./arbys.html");

// create a static server handler
function createServer(path) {
  return function(request, response) {
    paperboy
    .deliver(path, request, response)
    .addHeader('Expires', 0)
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
    })
    .otherwise(function(err) {
      // res.writeHead(404, {'Content-Type': 'text/plain'});
      // res.end("Error 404: File not found");
      // return the page
      Seq()
      .par(function() {
        // load head
        fs.readFile(arbys_head, this);
      })
      .par(function() {
        // load foot
        fs.readFile(arbys_foot, this);
      })
      .par(function() {
        // load body
        fs.readFile(arbys_main, this);
      })
      .seq(function(head, foot, body) {
        return response.end([head, body, foot].join("\n"));
      });
    });
  };
}

fileServer = createServer(path.normalize("" + __dirname + "/"));
http.createServer(fileServer).listen(3000);

sys.log("Server listening on port 3000");