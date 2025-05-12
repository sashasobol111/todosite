/**
 * Обработчик события DOMContentLoaded.
 * После полной загрузки DOM выполняет запрос к OpenWeatherMap API для получения текущей погоды в городе Минск.
 * Выводит температуру и краткое описание погоды в элемент с id 'weather'.
 *
 * @listens document#DOMContentLoaded
 *
 * @example
 * // На странице должен быть элемент:
 * // <div id="weather"></div>
 *
 * // После загрузки страницы будет отображаться, например:
 * // ⛅ 15°C
 */
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "091de172211b1a8f6a5cfa8e9b74ea19";
  const city = "Minsk";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp.toFixed(0);
      const description = data.weather[0].description;
      document.getElementById("weather").innerHTML = `⛅ ${temperature}°C`;
    })
    .catch((error) => console.error("Error:", error));
});
