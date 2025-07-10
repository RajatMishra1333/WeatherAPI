const apiKey = "97d8897099c630d474e139718e7015a8";
let currentCity = "Delhi";


function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  $.getJSON(url, function (data) {
    $('#city').text(data.name);
    $('#desc').text(data.weather[0].description);
    $('#temp').text(`${Math.round(data.main.temp)}°C`);
    $('#icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentCity = data.name;
  }).fail(function () {
    alert("City not found. Please enter a valid city name.");
  });
}


fetchWeather(currentCity);


$('#refresh').on('click', function () {
  fetchWeather(currentCity);

  const btn = this;
  btn.classList.add("rotate");

  setTimeout(() => {
    btn.classList.remove("rotate");
  }, 700);
});


$(document).on('click', '#city', function () {
  const currentText = $(this).text();
  $(this).replaceWith(`<input type="text" id="cityInput" class="city-input" value="${currentText}" autofocus />`);
  $('#cityInput').focus();
});


$(document).on('keypress', '#cityInput', function (e) {
  if (e.which === 13) {
    const newCity = $(this).val().trim();
    if (newCity !== "") {
      fetchWeather(newCity);
    }
  }
});


$(document).on('blur', '#cityInput', function () {
  const fallbackCity = currentCity;
  $(this).replaceWith(`<span id="city" title="Click to change city">${fallbackCity}</span>`);
});
