const operations = {
    'X': (num1, num2) => num1 * num2,
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '/': (num1, num2) => {
        if (num2 === 0) {
            populateMessage('Supply second number with not 0 value');
            operator = '/';
        } else {
            return num1 / num2;
        }
    },
};
let roundResult = (result) => {
    let handledResult = String(result).split('.');
    if (handledResult[1] !== undefined && handledResult[1][3] !== undefined) {
        let numbersForRounding = Math.round(parseFloat(handledResult[1].slice(0, 3) + '.' + handledResult[1][3]));
        return handledResult[0]+ '.' + numbersForRounding;
    } else {
        return result;

    }


};
let operate = (num1, operator, num2) => {
    let result = roundResult(operations[operator](num1, num2));
    if (result !== undefined) {
        firstNumber = result;
        inputArea.value = firstNumber;
    } else {
        inputArea.value = '';
    }

}


let createButtonsBlockElement = (element) => {
    return document.createElement(`${element}`);
}
let fillWithButtons = () => {
    let buttonsBlock = document.querySelector('.buttons-block');
    for (let i = 0; i < 10; i++) {
        let button = createButtonsBlockElement('button');
        button.textContent = `${i}`
        button.classList.add('calc-variable')
        buttonsBlock.appendChild(button);
    }
    let equalSign = createButtonsBlockElement('button');
    equalSign.textContent = '.';
    equalSign.classList.add('calc-variable')
    buttonsBlock.appendChild(equalSign);
    let eraseButton = createButtonsBlockElement('button');
    eraseButton.textContent = 'AC';
    eraseButton.classList.add('operationKeys');
    eraseButton.addEventListener('click', () => {
        inputArea.value = '';
        firstNumber = undefined;
        operator = undefined;
        secondNumber = undefined;
    });
    buttonsBlock.appendChild(eraseButton);

};

let displayCharacter = (event) => {
    inputArea.value += event.target.textContent;
};
document.addEventListener('DOMContentLoaded', fillWithButtons);
document.addEventListener('DOMContentLoaded', () => {
    let charactersButtons = document.querySelectorAll('.calc-variable');
    charactersButtons.forEach(button => {
        button.addEventListener('click', displayCharacter)
    });
});

let inputArea = document.querySelector('input[type="text"]');

let operationKeys = document.querySelectorAll('.operationKeys');
let firstNumber, operator, secondNumber;

operationKeys.forEach(key => {
    key.addEventListener('click', (event) => {
        if (inputArea.value !== '' || typeof firstNumber === 'undefined') {
            firstNumber = parseFloat(inputArea.value);
            operator = event.target.textContent;
            inputArea.value = '';
        }
    })
})

let getOperationValueButton = document.querySelector('.equal')
getOperationValueButton.addEventListener('click', (event) => {
    let secondNumber = inputArea.value;
    console.log(secondNumber, firstNumber, operator);
    if (firstNumber !== undefined && operator !== undefined && secondNumber !== '') {
        clearMessagesList();
        operate(firstNumber, operator, parseFloat(inputArea.value));
    } else if (firstNumber === undefined && secondNumber === undefined || secondNumber === '') {
        clearMessagesList();
        populateMessage('Now provide number')
    } else if (typeof operator === 'undefined') {
        clearMessagesList();
        populateMessage('Provide operator')
    }
});
const populateMessage = (message) => {
    let listElement = messagesBlock.firstElementChild;

    if (listElement === null) {
        let newListElement = document.createElement('ul');
        let populatedList = insertMessageItemIntoList(message, newListElement);
        messagesBlock.appendChild(populatedList);
    } else {
        messagesBlock.appendChild(insertMessageItemIntoList(message, listElement));
    }

};
const insertMessageItemIntoList = (text, listElement) => {
    let messageElement = document.createElement('li');
    messageElement.textContent = text;
    listElement.appendChild(messageElement);
    return listElement;
};

const clearMessagesList = () => {
    messagesBlock.innerHTML = '';
};
let messagesBlock = document.querySelector('.response-area');
const deleteCharacterAction = document.querySelector('#delete-character');
deleteCharacterAction.addEventListener('click', (event) => {
    inputArea.value = inputArea.value.slice(0, -1);
    console.log(inputArea.value);
});