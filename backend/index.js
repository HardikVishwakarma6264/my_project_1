const express = require('express');
const app = express();
const os = require("os");

const userrouter = require("./routes/Userr");
const profilerouter = require("./routes/Profile");
const paymentrouter = require("./routes/Payments");
const courserouter = require("./routes/Courses");

const database = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const cloudinaryConnect = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ debug: false });
const PORT = process.env.PORT || 4001;

// database connect
database.connect();

// cloudinary connect
cloudinaryConnect();

// middleware
app.use(express.json());
app.use(cookieparser());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));

app.use(cors({
  origin: "*",
  credentials: true,
}));


app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(), // safe temp folder on Windows/Linux/macOS
    limits: { fileSize: 50 * 1024 * 1024 }, // max 50 MB
  })
);

// routes
app.use("/api/v1/auth", userrouter);
app.use("/api/v1/profile", profilerouter);
app.use("/api/v1/course", courserouter);
app.use("/api/v1/payment", paymentrouter);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

// server start
app.listen(PORT, () => {
  console.log(`App is running at port no. -> ${PORT}`);
});
