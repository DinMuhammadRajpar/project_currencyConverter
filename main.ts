import inquirer from "inquirer";



let currency: any = {
  USD: 1,
  GBP: 0.91,
  Euro: 0.76,
  INR: 74.57,
  PKR: 280,
};


const addCurrency = async () => {
  

  const response = await inquirer.prompt([
    {
      name: "currencyName",
      type: "input",
      message: "Enter name of the currency"
    },
    {
      name: "currencyValue",
      type: "number",
      message: "Enter the value on the currency in terms of USD (e.g 1 USD = Your added currency)"

    }
  ]);

  const {currencyName, currencyValue} = response;
  currency[currencyName] = currencyValue;

  console.log(`Currency ${currencyName} with value ${currencyValue} is added`);
}


const currencyConverter = async () => {
  

let response = await inquirer.prompt([
  {
    name: "from",
    message: "Please select currency from the list (FROM)",
    type: "list",
    // choices: ["USD", "GBP", "Euro", "INR", "PKR"],
    choices: Object.keys(currency)
  },
  {
    name: "to",
    message: "Please select currency from the list (TO)",
    type: "list",
    choices: Object.keys(currency)
  },
  {
    name: "Amount",
    message: "Enter amount ?",
    type: "number",
  }
]);



let fromCurrency = currency[response.from];
let toCurrency = currency[response.to];
let user_amount = response.Amount;

let baseAmount = user_amount / fromCurrency;
let convertedAmount = baseAmount * toCurrency;
let toResponseCurrency = response.to;
console.log(`${convertedAmount} ${toResponseCurrency}`);

// console.log(convertedAmount);

}

async function main() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      message: "Select action:",
      type: "list",
      choices: ["Convert Currency", "Add Currency", "Exit"],
    },
  ]);

  switch (action) {
    case "Convert Currency":
      await currencyConverter();
      break;
    case "Add Currency":
      await addCurrency();
      break;
    case "Exit":
      console.log("Exiting program.");
      return;
  }

  main();
}

main();