const express = require("express");
const http = require("http");
const cors= require("cors");

const WebSocket = require("ws");
const app = express();

let server = http.createServer(app);


app.use(cors());
//app.use(express.json());
app.use("/", express.static(require("path").resolve(__dirname, "../client")));

const webserver = new WebSocket.Server({
  server
});

webserver.on("connection", function (ws) {
  ws.on("message", function (msg) {
    //log implements
    let msgData = JSON.parse(msg);
    console.log(msg.toString())
    webserver.clients.forEach((client)=> {
      if (client != ws && client.readyState === WebSocket.OPEN) {

        client.send(msg.toString());
      }
    });
  });

});

app.post("/", (req, res)=> {
	let text;
 req.on("data",(chunk)=>{
 	text += chunk;
 	});
 
 req.on("end",()=>{
  console.log(`LOGGED USER: ${text.slice(9)}`);
  
  });
});
server.listen(3000, ()=> {
  console.log("Server Connection Enabled!");
})