let firstNum = 0;
let operator = null;
let secondNum = null;
let replaceNum = true;

const add = (x, y) => x + y; // function to add two numbers
const subtract = (x, y) => x - y; // function to subtract two numbers
const multiply = (x, y) => x * y; // function to multiply two numbers
const divide = (x, y) => x / y; // function to divide two numbers

enableButtons();

// operate function; input: two numbers, callback: operation to perform on input numbers
function operate (operator, x, y) {
  // set cb to one of above callbacks based on operator
  let cb = null;
  switch(operator) {
    case '+':
      cb = add;
      break;
    case '-':
      cb = subtract;
      break;
    case '×':
      cb = multiply;
      break;
    case '÷':
      cb = divide;
      break;
  }

  const res = cb(x, y); // run numbers thru cb
  return Number(String(res).slice(0, 12)); // return result limited to 12 numbers
}

// obj: keys for each button text, values for desired result (number or function)

// function that enables buttons to populate display
function enableButtons() {
  const displayContent = document.querySelector('#display-content');

  // for each number button, pass into function to add event listener
  const numbers = document.querySelectorAll('.number');
  numbers.forEach(numberBtn => populateDisplay(numberBtn, displayContent));
  
  // for each operation button, pass into function to add event listener
  const operations = document.querySelectorAll('.operation');
  operations.forEach(operationBtn => enableOperations(operationBtn, displayContent));

  // pass equals button into function to add event listener
  const equals = document.querySelector('.equals');
  enableEquals(equals);

  // pass AC button into function to add event listener
  const ac = document.querySelector('.ac');
  enableAC(ac, displayContent);

  // pass del button into function to add event listener
  const del = document.querySelector('.del');
  enableDel(del, displayContent);

  // pass decimal button into function to add event listener
  const decimal = document.querySelector('.decimal');
  enableDecimal(decimal, displayContent);
}

// function to add event listeners to number buttons to populate the display
function populateDisplay(button, displayContent) {
  button.addEventListener('click', () => {
    if (replaceNum) {
      // replace displayContent text with button text
      displayContent.innerText = button.innerText;
      replaceNum = false;
    } else if (displayContent.innerText.length < 12) {
      // append button text to displayContent text
      displayContent.innerText += button.innerText;
    }
  });
}

// function to add event listeners to operation buttons to: set operator, firstNum, allow new num to be entered
function enableOperations(button, displayContent) {
  button.addEventListener('click', () => { // add click event listener to button
    if (operator) resolveOperation(); // if there already is an operator, resolve operation
    operator = button.innerText; // set operator to button text
    firstNum = Number(displayContent.innerText); // set firstNum to displayContent text, converted to Number
    replaceNum = true;
  });
}

// function to add event listener to equals button to: resolve operation and re-set operator to null
function enableEquals(button) {
  button.addEventListener('click', () => {
    resolveOperation();
    operator = null;
  });
}

// function to resolve the operation when both numbers and operation are defined
function resolveOperation() {
  const displayContent = document.querySelector('#display-content');
  
  secondNum = Number(displayContent.innerText); // set secondNum to displayContent text, converted to Number
  // pass operator, firstNum, secondNum into operate function; set to res
  let res = operate(operator, firstNum, secondNum);
  displayContent.innerText = res; // change displayContent text to res
  printOperation();
  firstNum = res; // change firstNum to res
  replaceNum = true;
}

// function to log most recent operation to the console in order to assure accuracy
function printOperation() {
  const displayContentText = document.querySelector('#display-content').innerText;
  console.log(`first num: ${firstNum} ${operator} ${secondNum} = ${displayContentText}`);
}

// function to add event listener to AC button to: clear the display and reset calculator
function enableAC(button, displayContent) {
  button.addEventListener('click', () => {
    firstNum = 0;
    displayContent.innerText = firstNum;
    operator = null;
    secondNum = null;
    replaceNum = true;
    printOperation();
  });
}

// function to add event listener to del button to: delete last element from display
function enableDel(button, displayContent) {
  button.addEventListener('click', () => {
    // if deleting the last element would result in an empty display, set display text to 0
    // else, delete last element
    let newText = displayContent.innerText.slice(0, displayContent.innerText.length - 1);
    newText.length < 1 ? displayContent.innerText = 0 : displayContent.innerText = newText;
  });
}

// function to add event listener to decimal button to: add a decimal to the display
function enableDecimal(button, displayContent) {
  button.addEventListener('click', () => {
    // if the display number should be replaced, add a 0 first
    if (replaceNum) {
      displayContent.innerText = 0;
      replaceNum = false;
    }
    // if display text doesn't already have a decimal, add a decimal
    if (!displayContent.innerText.includes(button.innerText)) {
      displayContent.innerText += button.innerText;
    }
  });
}