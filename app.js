window.addEventListener("load", () => {
  detectLocation();
});

//Dom Interactions

let long;
let lat;
const temperature = document.querySelector(".temperature");
const iconHolder = document.querySelector(".icon");
const condition = document.querySelector(".condition");
const season = document.querySelector(".season");
const locationName = document.querySelector(".location-name");
//New Location in DOM
const newTemperature = document.querySelector(".new-temperature");
const newIconHolder = document.querySelector(".new-icon");
const newCondition = document.querySelector(".new-condition");
const newSeason = document.querySelector(".new-season");
const newLocationName = document.querySelector(".new-location-name");
const form = document.querySelector("form");

const key = "02572f83abc89e6f03e6dd78d9991201";

//Geolocation

const detectLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let { temp } = data.main;
        let { name } = data;
        let { country } = data.sys;
        let { description, icon, main } = data.weather[0];

        temperature.textContent = temp + "`C";
        locationName.textContent = name + ", " + country;
        condition.textContent = description;
        season.textContent = main;
        iconHolder.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" height ='150px' width='150px'/>`;
      });
  });
};
form.addEventListener("submit", (e) => {
  const search = document.getElementById("search").value;

  e.preventDefault();

  const API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`;
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((content) => {
      console.log(content);
      let { temp } = content.main;
      let { description, icon, main } = content.weather[0];
      let { name } = content;
      let { country } = content.sys;
      newLocationName.textContent = name + ", " + country;
      newTemperature.textContent = temp + "`C";
      newCondition.textContent = description;
      newSeason.textContent = main;
      newIconHolder.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" height ='150px' width='150px'/>`;
    });
});
