import express from "express";
import http from "http";
import cors from "cors";
// import router from "./router";
// import compression from "compression";
// import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./router";
import cloudinary from 'cloudinary'
import connectDB from '../config'
import path from "path";
const app = express();
connectDB()

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// app.use(compression());
// app.use(cookieParser());
 app.use(bodyParser.json());

// Serve the frontend application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'build', 'index.html'));
});

const server = http.createServer(app);

cloudinary.v2.config({
    cloud_name: 'dub9cug8j',
    api_key: '557236423227666',
    api_secret: 'JeKDZseL-HSzWDh4t8iFRvs0MCg',
  });

// app.get("/", (req, res) => {
//     res.send("Hello, World!"); // Sending a simple response
//   });

server.listen(8080, () => {
  console.log("server running");
});

 app.use("/", router());
