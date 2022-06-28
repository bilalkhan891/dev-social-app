const fs = require("fs")
const http = require("http")
// const url = require("url")

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url)
  res.end()

}).listen(8000)
