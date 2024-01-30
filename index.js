const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";

app.get("/", (req, resp) => {
  resp.json({
    message: "A API SAMPLE",
  });
});

app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    username: "Anideep",
    email: "anideep@gmail.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    resp.json({ token });
  });
});

app.post("/profile", verifyToken, (req, resp) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      resp.send({ result: "Result is invalid token" });
    } else {
      resp.json({
        message: "Profile has accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, rest, next) {
  const bearerHeader = req.headers["authentication"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.send({
      result: "Token is invalid",
    });
  }
}

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
