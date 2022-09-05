const fs = require("fs");
const http = require("http");
const url = require("url");
/*
const fs = require("fs");

// Blocking synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we khow about Avocado: ${textIn}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("New file added");

const str = fs.readFileSync("./txt/start.txt", "utf-8");
console.log(str);

const importantTxt = fs.readFileSync("../Important-links.txt", "utf-8");
console.log(importantTxt);

const textOut2 = `Now im learning node.js.\n${Date.now()}`;
fs.writeFileSync("../Important-links.txt", textOut2);

// Non-blocking asynchronous way

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      const str = `${data2}\n${data3}`;
      fs.writeFile("./txt/final.txt", str, (err) => {
        console.log("The file has been wirtten!");
      });
    });
  });
});

console.log("Data is reading in the background");

*/

// console.log(http);
const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/products") {
    res.end("This is your product.");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("<h1>This page can not be found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
