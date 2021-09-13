const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

//routes
const apiRoute = require("./routes/api");
const htmlRoute = require("./routes/html");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// routes
app.use("/", apiRoute);
app.use("/", htmlRoute);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
