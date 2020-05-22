window.onload = () => {};

getWeather = () => {
  //place-box
};

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchElement = document.querySelector("input").value;
  const url = `/weather?place=${searchElement}`;
  console.log("url", url);
  document.getElementById(
    "h3"
  ).innerHTML = `Loading weather for ${searchElement}...`;

  fetch(url)
    .then(response => {
      response.json().then(text => {
        document.getElementById("h3").innerHTML = text.error
          ? text.error
          : text.location;
        document.getElementById("p1").innerHTML = text.forecast;
      });
    })
    .catch(err => {
      document.getElementById("h3").innerHTML = err.message;
    });
});
