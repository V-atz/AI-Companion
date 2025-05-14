const express = require("express");
const app = express();
const { port, mongoURL } = require("./config/config");
const connectToMongoDB = require("./config/connect");
const cors = require("cors");
const authRoute = require("./Routes/auth");
const chatRouter = require("./Routes/chat");
const charRouter = require("./Routes/char");
const uploadRouter = require("./Routes/upload");

//middleware
app.use(express.json());
app.use(cors());

//routes
//auth-route
app.use('/auth', authRoute)
//chats-route
app.use('/api', chatRouter)
//character-route
app.use('/api', charRouter)
//image-upload-route
app.use('/api', uploadRouter)

//server
const startServer = async () => {
  try {
    //db connection
    await connectToMongoDB(mongoURL);
    //server start
    app.listen(port, () => {
      console.log(`Server successfully at port ${port}`);
    });
  } catch (err) {
    console.error("Failer to start server!", err);
    process.exit(1);
  }
};

startServer();