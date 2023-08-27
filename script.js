let firstNum;
let operator;
let secondNum;

const add = (x, y) => x + y; // function to add two numbers
const subtract = (x, y) => x - y; // function to subtract two numbers
const multiply = (x, y) => x * y; // function to multiply two numbers
const divide = (x, y) => x / y; // function to divide two numbers

enableButtons();

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

// obj: keys for each button text, values for desired result (number or function)

// function that enables buttons to populate display
function enableButtons() { 
  const numbers = document.querySelectorAll('.number'); // select all number buttons
  // for each number button, add event listener: click, populateDisplay
  numbers.forEach(numberBtn => populateDisplay(numberBtn));
  
  // select all operation buttons
}

function populateDisplay(button) {
  const displayContent = document.querySelector('#display-content');
  button.addEventListener('click', () => {
    if (displayContent.innerText === '0') {
      // replace displayContent text with button text
      displayContent.innerText = button.innerText;
      // store button text in firstNum
      firstNum = button.innerText;
    } else if (displayContent.innerText.length < 12) {
      // append button text to displayContent text
      displayContent.innerText += button.innerText;
      // append button text to firstNum
      firstNum += button.innerText;
    }
  });
}