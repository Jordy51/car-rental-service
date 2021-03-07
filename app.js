const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.MongoURI || 5000;

// DB Config
const db = process.env.MongoURI + "RefyneCarRental";

// DB Connnection
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected!"))
	.catch((err) => console.log(err));

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /car
// /user

app.use("/car", require("./routes/carRoute"));
app.use("/user", require("./routes/userRoute"));

// /search-car

// /calculate-price

// /user/bookings

app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));
