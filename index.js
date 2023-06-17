const express = require("express");
const app = express();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ObjectID,
} = require("mongodb");
const cors = require("cors");
const port = 5000;
const courses = require("./data/courses.json");
const { query } = require("express");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://languagecourse:AtuTJgQOstdyInDR@cluster0.ddhlldi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const database = client.db("LanguageLearningZone");
    const coursesCollection = database.collection("courses");
    const bookingsColletion = database.collection("bookings");

    app.get("/courses", async (req, res) => {
      const query = {};
      const result = await coursesCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/courses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const course = await coursesCollection.findOne(query);
      res.send(course);
    });
    app.get("/cheakout/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const course = await coursesCollection.findOne(query);
      res.send(course);
    });
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      // console.log("booking", booking);
      const query = { stdentEmail: booking.stdentEmail };
      const alreadyBooked = await bookingsColletion.findOne(query);
      // console.log("already", alreadyBooked);
      if (
        booking.studentEmail === alreadyBooked?.studentEmail &&
        booking.courseDetail === alreadyBooked.courseDetail
      ) {
        return res.status(401).send();
      }
      if (
        booking.studentEmail === alreadyBooked?.studentEmail ||
        (booking.studentPhone === alreadyBooked?.studentPhone &&
          booking.courseDetail !== alreadyBooked.courseDetail)
      ) {
        // const result = await bookingsColletion.insertOne(booking);
        // return res.send(result);
      }

      // const result = await bookingsColletion.insertOne(booking);
      // res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const name = req.query.name;

      const query = { studentName: name, studentEmail: email };
      const result = await bookingsColletion.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
