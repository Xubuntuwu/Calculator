
function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}

function operate (operator, num1, num2) {
    switch (operator) {
       case "plusOperand": return add(Number(num1), Number(num2));
       case "minusOperand": return subtract(Number(num1), Number(num2));
       case "multiplyOperand": return multiply(Number(num1), Number(num2));
       case "divideOperand": return divide(Number(num1), Number(num2));
    }

}

function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed(dp);
  }

const displayContent = document.getElementById('display');
function displayNumbers(displayValue) {
    if (Number(displayValue)>100000) { /*if number is bigger than 100.000 then show the number in exponential with max decimal numbers of 4*/
        displayContent.textContent= Number(displayValue).toExponential(5);
    }
    else { /*if too many numbers after the decimal point (e.g when calculating 1/3) --> max number shown is 4*/
        displayContent.textContent = toFixedIfNecessary(Number(displayValue),5);
    }
}

let newestNumber=''; 
let savedNumber='';
let lastOperator='';

/*get numbered elements and listen for click, when clicked send element to function newnumber which assigns it to the variable newNumber*/
const numberNodeList = document.getElementsByClassName('numberType');
const numberButtonsArray = Array.from(numberNodeList);
for(number in numberButtonsArray) {
    numberButtonsArray[number].addEventListener('click', (el) =>{ newNumber(el.target);});
}

function newNumber(element) {
    newestNumber+= element.textContent;
    displayNumbers(newestNumber);

}
/* get operator elements and listen for click, when clicked send element to function newoperator which handles it from there */
const operatorNodeList = document.getElementsByClassName('operatorType');
const operatorButtonsArray = Array.from(operatorNodeList);
for(operandor in operatorButtonsArray) {
    operatorButtonsArray[operandor].addEventListener('click', (el) =>{ newOperator(el.target)});
}

function newOperator(operator) {
    if(operator.id=='clear') {
        newestNumber='';
        savedNumber='';
        lastOperator='';
        displayContent.textContent = 'Clear';
        setTimeout(()=>{displayNumbers(0)},400)
    }
    else if(operator.id=='equalOperand') {
        if(lastOperator!='' && lastOperator!='equalOperand' && newestNumber!= '') { /* newestnumber cant be empty in case somebody types " 5*9=*=" the *= or /= resulted in the total turning into 0 (as if cleared) */
            savedNumber=operate(lastOperator, savedNumber, newestNumber);
            lastOperator=operator.id;
            newestNumber='';
        }
        else if(lastOperator!='equalOperand' && newestNumber!= ''){
            savedNumber=newestNumber;
            lastOperator=operator.id;
            newestNumber='';
        }
        displayContent.textContent='';
        setTimeout(()=>displayNumbers(savedNumber), 100);
    }
    else if(operator.id=='negOperand') {
        if(newestNumber!='') {
            newestNumber= String(Number(newestNumber)*-1);
            displayNumbers(newestNumber);
        }
        else {
            savedNumber= String(Number(savedNumber)*-1);
            displayNumbers(savedNumber);
        }
    }
    else if(operator.id=='point'){
        newestNumber+='.';
    }
    else if(operator.id == 'backspace'){
        newestNumber = newestNumber.slice(0, newestNumber.length - 1);
        displayNumbers(newestNumber);
    }

    else if (savedNumber=='') {
        savedNumber=newestNumber;
        displayNumbers(savedNumber);
        lastOperator=operator.id;
        newestNumber='';
    }
    else if(newestNumber=='') {
        displayNumbers(savedNumber);
        lastOperator=operator.id;
        newestNumber=''; 
    }
    else {
        savedNumber= operate(lastOperator, savedNumber, newestNumber);
        displayNumbers(savedNumber);
        lastOperator=operator.id;
        newestNumber='';
    }

}

/* there is still a somewhat unimportant backspace bug: if there is already a savednumber that has been calculated and outputted with the equal sign then typing backspace shows zero until you hit equal again and then it shows the savednumber. this looks confusing.*/
/* the newoperator function is literally ducktaped together. every time some button didnt work i added another subfunction so im suprised everything works but i guess thats what you get for less than a days work*/
/*i should have definitely written a really well thought out pseudocode for the operator function, it would have probably been really useful here*/