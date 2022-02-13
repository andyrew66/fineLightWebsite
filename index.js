require('dotenv').config()
const express = require('express')
const sprightly = require("sprightly")
const axios = require("axios")
const itemsPage = require( "./itemsPage.cjs")
const reports = require( "./reports.cjs")
const itemManagment = require( "./itemManagement.cjs")
const fs = require("fs");
const APIKEY = process.env.APIKEY
const { auth } = require("express-openid-connect");

const app = express();

app.engine("spy", sprightly);
app.set("views", "./views");

app.set("view engine", "spy");
app.use(express.static("./views"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.SESSION_SECRET,
  authRequired: false,
  auth0Logout: true,
}));

app.listen(8080, console.log("Running on port 8080"));
app.get("/login", function(req, res) {
  res.oidc.login({
    authorizationParams: {
      screen_hint: "signup",
    },
  });
});
app.use("/", itemsPage);
app.use("/", reports);
app.use("/item", itemManagment);
app.get("/", function(req, res) {
  res.render("./index.spy");
});
