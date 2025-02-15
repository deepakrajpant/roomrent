// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware (for user sessions, later authentication)
app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: false
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/room_rental", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Load the Room model
const Room = require("./models/Room");

// ROUTES

// Homepage - show featured rooms (limit to 4)
app.get("/", async (req, res) => {
  const rooms = await Room.find().limit(4);
  res.render("index", { rooms });
});

// Listings Page - show all rooms
app.get("/listings", async (req, res) => {
  const rooms = await Room.find();
  res.render("listings", { rooms });
});

// User Dashboard (dummy - extend with auth logic)
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Admin Panel (dummy - extend with admin auth/logic)
app.get("/admin", (req, res) => {
  res.render("admin");
});

// Contact Page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Booking Page - shows booking form for a room (using room id)
app.get("/booking/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.render("booking", { room });
});

// Reviews & Ratings Page
app.get("/reviews", (req, res) => {
  res.render("reviews");
});

// FAQs & Blog Page
app.get("/faqs", (req, res) => {
  res.render("faqs");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
