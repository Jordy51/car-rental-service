const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// DB Config
const db = process.env.MongoURI;

// DB Connnection
mongoose
	.connect(db + "RefyneCarRental", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected!"))
	.catch((err) => console.log(err));
// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/bookingRoute"));
app.use("/cars", require("./routes/carRoute"));
app.use("/user", require("./routes/userRoute"));

app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));
