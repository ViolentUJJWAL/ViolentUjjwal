const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./dataBase/db");
const path = require("path")
const cookieParser = require("cookie-parser");
require("dotenv").config();

const URL = process.env.MONGO_URI;
console.log(URL)
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    credentials: true,
  })
);


// Routes
// const { seedUsers } = require("./src/controllers/userController");
const authRoutes = require("./src/routes/authRoutes")
const userRoutes = require("./src/routes/userRoutes");
const dataRoutes = require("./src/routes/dataRoutes");
const contactUsRoutes = require("./src/routes/contactUsRoutes");
const testimonialsRoutes = require("./src/routes/testimonialsRoutes");

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/data", dataRoutes)
app.use("/api/contact-us", contactUsRoutes)
app.use("/api/testimonial", testimonialsRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// Starting the server
app.listen(PORT, async () => {
  const db = await connectDB(URL);
  if(db){
    console.log(`Server running on Port- ${PORT}`.bgBlue.black);
    // seedUsers()
  }else{
    console.log(`Server Not run due to DataBase not connected properly`.bgRed.black)
  }
});
