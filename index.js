var admin = require("firebase-admin");
var express = require("express");

// var serviceAccount = require("./chatterbox-c7b80-firebase-adminsdk-lc5jm-06fe340b3f.json");


var api = express();

api.use(express.json());

const PORT = process.env.PORT || 5000;


admin.initializeApp({
    credential: admin.credential.cert(
        {
            "type": "service_account",
            "project_id": "chatterbox-c7b80",
            "private_key_id": "06fe340b3f1cbb8d65897605a1c42081e3e78f2f",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDp3Rkk9xjveXNb\nTGu5WSXGzSiND+ogTqScBqTljmTjM5IVX7jDi9sc+HNaAjCkHYEqGeHHSIC9Ai8h\ngLip/oZYBsvvj9je2ieGcpAsPP0gyx5OG8BH1GtevnuuZhKkVA/A08AXjpAB/LhY\n66siyYHEvSjEdcxr32iP5E2dQNXd6NYgSsjbz8UY6419lmvVeRI71FFtARr3joHx\nt92nClTWMFN/hU0cW67UpE4WqYRP9nAJXDG6sbo3pCKfwQZq4C7K36qa7hcJgLsZ\neJIftgQV6ytjNwikkY+Y9FKgUSw2wjQAxnz69IGEu6CFptCg3WPf9+AT4X42JkOQ\nEy3jBm2hAgMBAAECggEAI9oYY7lZ4kSNMb7qeNS43NxQzidVbjSAOccu+l41Czu5\ntnshOSE0qyFPlcnmKRK43XpwSXvM+KzgCtPP+4egktgf5Y744VkyXAMuJQoIiEF7\nWOAaPyjKeRDcpyTQ0M5uR9JujW32l8dlf4RJjSC1OzMAj/W7LAJo5j5Kw8PPxaAE\nMsz883/u9n/F5/M/kqGgrs0S0RPzhWKMUQ+6LHJWXzahglzxyBHsFOYqinxvHiSS\nmH8nMIvJnJXKNwY6D1VQgLyNAMrn08/SKNKdP6AhKzfgvJfTAUS9Tn76w3aVti3V\nKHPDECM+72DP0Ld8n53WbqN9G7xcuWWoi/+Qvbv47QKBgQD/3ssBUXTlO0cwfZe2\nbgKmIwD/th6hnO5XSW54acULJRvAM7Wy993vB+eqM7cx3KKL2flPPoW8KDFYKioU\nuClizu0GxASD/wK1e/fnXjDZUXBW7qzLZmyAxBR+1wgA5rZJF/L0mj9xwWO+hpKq\nNyI4xgnCwe8lIn5nwllIVmf9awKBgQDp+3L+pEv7cyq11MbKqGGSR+tOS9KVp2vd\nAOfm7emDPNBfMG8AucMTvHli+MIfoNFc25aRDs+saYLFpfchQWTUv4He/vG2VpxY\nGpdEJBFw597kV8izmJsrcJou5HBadQet5wty3/+qdpPoyUG5vLViE1UwRY0g8y8i\neBWORZZYIwKBgG42RBEESiq3FtnvLxsYVbHEIBkFFDqewxb7/UaGoKZFTKfEXj6B\nf6oHKKVqcz1aAPXmZPnaP3alhWOpfcjA7qqt4PDqG9vTSxJrHIQfUUE6T/5R/kH6\nkz//tahQ7RSeS+Q+GZt8mVlhaJpXkvMYnnf/7ZJjQKQpMHN3BkgfV9mTAoGAZ8Pj\nk5o5OCIy5sCeCHH0E3Nhny9xDH1bEH++WGNaE6F8pzpLf/7hzHbhPksji/M95fhc\nJahz4PpJzG1104G0vcTQS5y0hTCT1V61hrqYIYIzDwD/OOaMqg8d0X3tdbBA35Z/\nNUqxj19W6P2X8E8IAZ6hQO8XT22Jkbe/l4C01BECgYEA1iRhW06H/ZVaxp0/o5WZ\n8OM4MvSuRxmjL/bxxaXqGpARp7R3E4Ib15wvTFEqky2bAuicV6tJCqp47zYRrrzh\n7i8TsyTnRToY8UMcIyupp8D2AeedMZd5Hkmh664+a0rESs9Mmxb34tr7TvsdOR/i\nZfL0vXcbg4I7TPBU0JBiCjY=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-lc5jm@chatterbox-c7b80.iam.gserviceaccount.com",
            "client_id": "101291329925614012469",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lc5jm%40chatterbox-c7b80.iam.gserviceaccount.com"
        }
    ),
    databaseURL: "https://chatterbox-c7b80-default-rtdb.firebaseio.com"
});

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


async function send(msg, sender, token) {


    await admin.messaging().send({
        android: {
            priority: "high",
            notification: {
                title: sender,
                body: msg,
                channelId: "highandsound",
                sound: "notification.wav",
                color: '#075E54'
            }

        },


        token: token
    }).then((res) => {
        console.log("sent", res);
    });
}

// send();
