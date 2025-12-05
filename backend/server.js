import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/config/socket.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
