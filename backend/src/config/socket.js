import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    // Company room join
    socket.on("joinCompany", (companyId) => {
      socket.join(companyId);
      console.log(`Socket ${socket.id} joined company ${companyId}`);
    });
  });
};

export const getIO = () => io;