const express = require("express");
const { Http2ServerRequest } = require("http2");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("./"));

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

io.on("connection", socket => {

    const id = socket.id;
    console.log("[CONNECTION] ID: " + id);

});

server.listen(PORT, () => console.log("[START SERVER] PORT: " + PORT));