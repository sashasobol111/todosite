/**
 * Асинхронно получает текущие курсы валют с сайта Национального банка Республики Беларусь (НБРБ)
 * по API https://www.nbrb.by/api/exrates/rates?periodicity=0 и отображает официальный курс доллара США (USD)
 * в элементе с id 'curses' на странице.
 *
 * @async
 * @function getExchangeRates
 * @returns {Promise<void>} Возвращает промис, который завершается после обновления DOM или при возникновении ошибки.
 *
 * @throws {Error} Если возникает ошибка при получении или обработке данных, она будет выведена в консоль.
 *
 * @example
 * // Вызов функции для отображения курса USD:
 * getExchangeRates();
 *
 * // На странице должен быть элемент:
 * // <div id="curses"></div>
 */

async function getExchangeRates() {
  try {
    const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
    const response = await fetch(url);
    const data = await response.json();
    const usdRate = data
      .find((rate) => rate.Cur_Abbreviation === "USD")
      .Cur_OfficialRate.toFixed(2);
    document.getElementById("curses").innerHTML = `💱 1 USD: ${usdRate} BYN`;
  } catch (error) {
    console.error("Ошибка при получении курсов валют:", error);
  }
}

getExchangeRates();
