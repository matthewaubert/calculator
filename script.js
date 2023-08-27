let firstNum;
let operator;
let secondNum;

const add = (x, y) => x + y; // function to add two numbers
const subtract = (x, y) => x - y; // function to subtract two numbers
const multiply = (x, y) => x * y; // function to multiply two numbers
const divide = (x, y) => x / y; // function to divide two numbers

// operate function; input: two numbers, callback: operation to perform on input numbers
function operate (operator, x, y) {
  // set cb to one of above callbacks based on operator
  let cb;
  switch(operator) {
    case '+':
      cb = add;
      break;
    case '-':
      cb = subtract;
      break;
    case '*':
      cb = multiply;
      break;
    case '/':
      cb = divide;
      break;
  }
  return cb(x, y);
}

// function that enables buttons to populate display
  // select display
  // select buttons
  // obj: keys for each button text, values for desired result (number or function)

  // for each button