const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bugettrackerdb:PkANEChpRB2I1LKE@cluster0.wmvvx.azure.mongodb.net/buget?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});