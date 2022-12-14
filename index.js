// Dependencies

const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
/////////////////////////////////////////
/* *************
Reading data from the file system
************** */
////////////////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const dataObj = JSON.parse(data);

/////////////////////////////////////////
/* *************
Server
************** */
////////////////////////////////////////

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathName === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, { "Content-type": "text/html" });

    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("<h1>This page can not be found!</h1>");
  }
});

server.listen(80, "127.0.0.1", () => {
  console.log("Listening to requests on port 80");
});
