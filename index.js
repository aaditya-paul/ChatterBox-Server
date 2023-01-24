var admin = require("firebase-admin");
var express = require("express");
var serviceAccount = require("./chatterbox-c7b80-firebase-adminsdk-lc5jm-06fe340b3f.json");

var api = express();

api.use(express.json());

const PORT = process.env.PORT || 5000;


api.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});

api.get("/", (req, res) => {
  res.send("hello!");
});

api.post("/data", (req, res) => {
  res.send("success");
  console.log(req.body);
  var token = req.body.token;
  var message = req.body.message;
  var sender = req.body.sender;

  send(message, sender, token);
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatterbox-c7b80-default-rtdb.firebaseio.com",
});

async function send(msg, sender, token) {
  await admin
    .messaging()
    .send({
      android: {
        priority: "high",
        notification: {
          title: sender,
          body: msg,
          channelId: "highandsound",
          sound:"mixkit-sci-fi-reject-notification-896.wav",
          color: '#075E54',
          },
       
      },
      
      
      token: token,
    })
    .then((res) => {
      console.log("sent", res);
    });
}

// send();
