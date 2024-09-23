export default function (
  price: string,
  currency: "IDR" | "USD" | "JPY" | "CNY" = "IDR"
) {
  if (!price) return;
  // Split the range string into start and end numbers
  const [start, end] = price.split(" - ").map(parseFloat);

  if (start && end) {
    // Format start number
    let formattedStart = start?.toLocaleString(setCountryCurrency(currency), {
      style: "currency",
      currency: currency,
    });

    // Format end number
    let formattedEnd = end?.toLocaleString(setCountryCurrency(currency), {
      style: "currency",
      currency: currency,
    });

    return `${replaceCurrencySymbol(
      formattedStart,
      currency
    )} - ${replaceCurrencySymbol(formattedEnd, currency)}`;
  }

  if (isNaN(parseInt(price))) {
    return "-";
  }

  let formatted = parseFloat(price)?.toLocaleString(
    setCountryCurrency(currency),
    { style: "currency", currency: currency }
  );
  return replaceCurrencySymbol(formatted, currency);
}

function setCountryCurrency(currency: "IDR" | "USD" | "JPY" | "CNY" = "IDR") {
  switch (currency) {
    case "IDR":
      return "id-ID";
    case "USD":
      return "en-US";
    case "JPY":
      return "ja-JP";
    case "CNY":
      return "zh-CN";
    default:
      return "id-ID";
  }
}

function replaceCurrencySymbol(
  formattedString: string,
  currency: "IDR" | "USD" | "JPY" | "CNY"
) {
  switch (currency) {
    case "IDR":
      return formattedString.replace("Rp", "IDR");
    case "USD":
      return formattedString.replace("$", "USD");
    case "JPY":
      return formattedString.replace("¥", "JPY");
    case "CNY":
      return formattedString.replace("¥", "CNY");
    default:
      return formattedString;
  }
}
