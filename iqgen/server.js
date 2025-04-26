const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // HTTP server for WebSockets
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://iqgen.energy",
    credentials: true,
  },
});

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://iqgen.energy",
    credentials: true,
  })
);

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax", 
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


// API Routes
app.use("/api", userRoutes);

// React Frontend Serving
const reactBuildPath = path.join(__dirname, "react", "build");
app.use(express.static(reactBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});


// ======= WebSocket Logic =======
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("addUser", (userData) => {
    const { userId, firstName, lastName, profileImage, email } = userData;
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, firstName, lastName, profileImage, email, socketId: socket.id });
    }
    io.emit("getUsers", onlineUsers);
    console.log("User connected:", onlineUsers);
  });

  socket.on("removeUser", (userId) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    io.emit("getUsers", onlineUsers);
    console.log(`User removed from online list: ${userId}`);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", onlineUsers);
    console.log(`User disconnected: ${socket.id}`);
  });
});



// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});










// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const connectDB = require("./src/config/db");
// const userRoutes = require("./src/routes/userRoutes");

// dotenv.config();
// connectDB();

// const app = express();

// // CORS Configuration (Allows cookies for authentication)
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://98.83.66.76:5002", // Allow frontend
//     credentials: true, // Allow cookies
//   })
// );

// // Serve uploaded images as static files
// app.use('/uploads', express.static('uploads'));


// // Middleware
// app.use(express.json()); // Body parsing
// app.use(express.urlencoded({ extended: true }));


// // Session Configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "supersecretkey",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//     }),
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // Secure only in production
//       httpOnly: true, // Prevents XSS attacks
//       sameSite: "lax", // Helps with CSRF protection
//       maxAge: 1000 * 60 * 60 * 24, // 1 day session expiry
//     },
//   })
// );

// // API Routes
// app.use("/api", userRoutes);

// // React Frontend Serving
// const reactBuildPath = path.join(__dirname, "react", "build");
// app.use(express.static(reactBuildPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(reactBuildPath, "index.html"));
// });




// // Start Server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


