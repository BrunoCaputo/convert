/**
 * Daily currency price
 */
const price = {
  USD: 5.59,
  EUR: 6.22,
  GBP: 7.33,
};

/**
 * Currency symbol
 */
const symbol = {
  USD: "US$",
  EUR: "€",
  GBP: "£",
};

/**
 * DOM form element
 */
const form = document.querySelector("form");

/**
 * Amount DOM input element
 */
const amount = document.getElementById("amount");

/**
 * Currency DOM select element
 */
const currency = document.getElementById("currency");

/**
 * DOM footer element
 */
const footer = document.querySelector("main footer");

/**
 * Currency description DOM footer span element
 */
const description = document.getElementById("description");

/**
 * Conversion result DOM footer h1 element
 */
const result = document.getElementById("result");

/**
 * Handle input to receive only numbers
 */
amount.addEventListener("input", ({ target }) => {
  const hasCharactersRegex = /\D+/g;
  target.value = target.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (ev) => {
  ev.preventDefault();

  const amountValue = Number(amount.value);
  let currentPrice = 0;
  let currentSymbol = "";
  switch (currency.value) {
    case "USD":
      currentPrice = price["USD"];
      currentSymbol = symbol["USD"];
      convertCurrency(amountValue, currentPrice, currentSymbol);
      break;
    case "EUR":
      currentPrice = price["EUR"];
      currentSymbol = symbol["EUR"];
      convertCurrency(amountValue, currentPrice, currentSymbol);
      break;
    case "GBP":
      currentPrice = price["GBP"];
      currentSymbol = symbol["GBP"];
      convertCurrency(amountValue, currentPrice, currentSymbol);
      break;
    default:
      break;
  }
};

/**
 * Handle the currency conversion
 *
 * @param {number} amount Amount to convert
 * @param {number} price Daily currency price
 * @param {string} symbol Currency symbol
 */
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    const total = formatCurrencyBRL(amount * price).replace("R$", "");
    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");

    console.log(error);
    alert("An error occurred while converting the currency.");
  }
}

/**
 * Fomat the price to Brazilian currency
 *
 * @param {number} value The currency price
 * @returns {string} Formatted value to BRL
 */
function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
