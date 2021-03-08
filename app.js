const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// DB Config
const db = process.env.MongoURI;

// DB Connnection
mongoose
	.connect(db + "RefyneCarRental", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected!"))
	.catch((err) => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// /car
// /user
app.use("/", require("./routes/bookingRoute"));
app.use("/cars", require("./routes/carRoute"));
app.use("/user", require("./routes/userRoute"));

// /search-car

// /calculate-price

// /user/bookings

app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));
