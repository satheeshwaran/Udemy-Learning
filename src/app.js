const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./forecast");

const app = express();
const publicDirectory = path.join(__dirname, "..", "/public");
const viewsPath = path.join(__dirname, "..", "/templates/views");
const partialsPath = path.join(__dirname, "..", "/templates/partials");

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Yuvan Sai"
  });
});
app.get("/data", (req, res) => {
  res.send({ weather: "hot right now" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Don't come here if you need help!!",
    src: "img/me.jpg",
    name: "Satheeshwaran J"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather app",
    src: "img/me.jpg",
    name: "Satheeshwaran J"
  });
});

app.get("/weather", (req, res) => {
  // res.send("Awesome weather data here!");
  if (!req.query.place) {
    res.send({ error: "Please enter Address/place name" });
  } else {
    forecast.forecast(req.query.place, data => {
      res.send({
        forecast: data.forecast,
        location: data.place_name,
        place: req.query.place,
        ...(data.error ? { error: data.error } : null)
      });
    });
  }
});

app.get("/products", (req, res) => {
  console.log("request", req.query.search);
  res.send({ products: [] });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "HTTP 404: Oops nothing found"
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is up");
});
