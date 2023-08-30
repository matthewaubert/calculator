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
  return Number(formatRes(res)); // return correctly formatted result
}

// format results to limit characters and remove trailing zeros
function formatRes(num) {
  res = String(num).slice(0, 12); // limit to 12 characters
  // if number has decimal, remove trailing zeros
  if (res.includes('.')) {
    while (res[res.length - 1] === '0') res.slice(0, res.length - 1);
  }
  return res;
}

function enableButtons() {
  const displayContent = document.querySelector('#display-content');

  // for each number button, pass into function to add event listener
  const numbers = document.querySelectorAll('.number');
  numbers.forEach(numberBtn => populateDisplay(numberBtn, displayContent));
  
  // for each operation button, pass into function to add event listener
  const operations = document.querySelectorAll('.operation');
  operations.forEach(operationBtn => enableOperations(operationBtn, displayContent));

  enableEquals(displayContent);
  enableAC(displayContent);
  enableDel(displayContent);
  enableDecimal(displayContent);
  enablePosNeg(displayContent);
  enablePercent(displayContent);
}

// add event listeners to number buttons to populate the display
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

// add event listeners to operation buttons to: set operator, firstNum, allow new num to be entered
function enableOperations(button, displayContent) {
  button.addEventListener('click', e => { // add click event listener to button
    if (operator) resolveOperation(displayContent); // if there is already an operator, resolve operation
    operator = button.innerText; // set operator to button text
    firstNum = Number(displayContent.innerText); // set firstNum to displayContent text, converted to Number
    replaceNum = true;
    e.target.classList.add('selected');
  });
}

// add event listener to equals button to: resolve operation and re-set operator to null
function enableEquals(displayContent) {
  const equals = document.querySelector('.equals');
  equals.addEventListener('click', () => {
    if (operator) resolveOperation(displayContent);
    operator = null;
  });
}

// resolve the operation when both numbers and operation are defined
function resolveOperation(displayContent) {  
  secondNum = Number(displayContent.innerText); // set secondNum to displayContent text, converted to Number
  
  if (operator === '÷' && secondNum === 0) { // edge case: if user tries to divide by 0
    displayContent.innerText = 'lol';
  } else {
    // pass operator, firstNum, secondNum into operate function; set to res
    let res = operate(operator, firstNum, secondNum);
    displayContent.innerText = res; // change displayContent text to res
    printOperation();
    firstNum = res; // change firstNum to res
  }
  replaceNum = true;

  const selected = document.querySelector('.selected'); // select selected operation button
  selected.classList.remove('selected'); // remove 'selected' class
}

// log most recent operation to the console in order to assure accuracy
function printOperation() {
  const displayContentText = document.querySelector('#display-content').innerText;
  console.log(`first num: ${firstNum} ${operator} ${secondNum} = ${displayContentText}`);
}

// dd event listener to AC button to: clear the display and reset calculator
function enableAC(displayContent) {
  const ac = document.querySelector('.ac');
  ac.addEventListener('click', () => {
    firstNum = 0;
    displayContent.innerText = firstNum;
    operator = null;
    secondNum = null;
    replaceNum = true;
    printOperation();

    const selected = document.querySelector('.selected'); // select selected operation
    if (selected) selected.classList.remove('selected'); // remove 'selected' class
  });
}

// add event listener to del button to: delete last element from display
function enableDel(displayContent) {
  const del = document.querySelector('.del');
  del.addEventListener('click', () => {
    // if deleting the last element would result in an empty display, set display text to 0
    // else, delete last element
    if (!replaceNum) {
      let newText = displayContent.innerText.slice(0, displayContent.innerText.length - 1);
      if (newText.length < 1) {
        displayContent.innerText = 0;
        replaceNum = true;
      } else {
        displayContent.innerText = newText;
      }
    }
  });
}

// add event listener to decimal button to: add a decimal to the display
function enableDecimal(displayContent) {
  const decimal = document.querySelector('.decimal');
  decimal.addEventListener('click', () => {
    // if the display number should be replaced, add a 0 first
    if (replaceNum) {
      displayContent.innerText = 0;
      replaceNum = false;
    }
    // if display text doesn't already have a decimal, add a decimal
    if (!displayContent.innerText.includes(decimal.innerText)) {
      displayContent.innerText += decimal.innerText;
    }
  });
}

// add event listener to pos-neg button to: reverse display number sign (e.g. positive to negative)
function enablePosNeg(displayContent) {
  const posNeg = document.querySelector('.pos-neg');
  posNeg.addEventListener('click', () => {
    if (displayContent.innerText !== '0') {
      displayContent.innerText.includes('-') ?
        displayContent.innerText = displayContent.innerText.slice(1) :
        displayContent.innerText = '-' + displayContent.innerText;
    }
  });
}

// add event listener to percent button to: move decimal place to left by 2 digits
function enablePercent(displayContent) {
  const percent = document.querySelector('.percent');
  percent.addEventListener('click', () => {
    const res = displayContent.innerText / 100;
    console.log(res);
    displayContent.innerText = formatRes(res); // limit to 12 characters
    replaceNum = true;
  });
}