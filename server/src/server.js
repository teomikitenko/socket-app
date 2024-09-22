import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
/* import { DatabaseSync } from "node:sqlite"; */

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 3000;

/* const database = new DatabaseSync("chat.db"); */

/* database.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`); */

  app.use(express.static(join(process.cwd()))); 

app.get('/',(req,res)=>{
  res.send('Hello server')
})

io.on("connection", (socket) => {
/*   const prepQuery = database.prepare("SELECT content FROM messages");
  const query = prepQuery.all(); */
/*   socket.emit("restored_data", query);
 */  socket.on("chat", (msg) => {
    try {
  /*     let result = database.prepare(
        "INSERT INTO messages (content) VALUES (?)"
      );
      result.run(msg); */
      io.emit("chat", msg);
    } catch (e) {
      console.log(`some error ${e} `)
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Hello from ${PORT} port`);
});
