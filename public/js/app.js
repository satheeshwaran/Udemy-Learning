console.log("Client side hello");
// const verseChoose = document.querySelector("select");
// const poemDisplay = document.querySelector("pre");

window.onload = () => {};

getWeather = () => {
  //place-box
};

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchElement = document.querySelector("input").value;
  const url = "http://localhost:3001/weather?place=" + searchElement;
  document.getElementById(
    "h3"
  ).innerHTML = `Loading weather for ${searchElement}...`;

  fetch(url)
    .then(response => {
      response.json().then(text => {
        //   weather = JSON.parse(text);
        console.log(text);
        document.getElementById("h3").innerHTML = text.error
          ? text.error
          : text.location;
        document.getElementById("p1").innerHTML = text.forecast;
      });
    })
    .catch(err => {
      console.log("Fetch problem: " + err.message);
      document.getElementById("h3").innerHTML = err.message;
    });
});
