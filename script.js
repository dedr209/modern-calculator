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
        return handledResult[0] + '.' + numbersForRounding;
    } else {
        return result;

    }


};
let finishResultIsDisplayed = false;
let operate = (num1, operator, num2) => {
    let result = roundResult(operations[operator](num1, num2));
    if (result !== undefined) {
        finishResultIsDisplayed = true;
        secondNumber = undefined;
        firstNumber = undefined;
        inputArea.value = result;
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
    if (event.target.textContent === '.') {
        if (!finishResultIsDisplayed) {
            if (floatingCharacterLogicChecking()) {
                inputArea.value += event.target.textContent;
            } else {
                clearMessagesList();
                populateMessage('Floating sign is not possible in second time')
            }

        } else {
            clearMessagesList();
            populateMessage('Floating sign is not possible at the start');
            inputArea.value = '';
        }
    } else if (finishResultIsDisplayed) {
        inputArea.value = event.target.textContent;
        finishResultIsDisplayed = false;
    } else {
        inputArea.value += event.target.textContent;
    }
};


let floatingCharacterLogicChecking = () => {
    let seperatedString = String(inputArea.value + '.').split('.');
    if (seperatedString.length === 3) {
        return false;
    } else {
        return true;
    }
}
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
        if ((inputArea.value !== '' || typeof firstNumber === 'undefined') && !finishResultIsDisplayed) {
            firstNumber = parseFloat(inputArea.value);
            operator = event.target.textContent;
        } else {
            clearMessagesList();
            populateMessage('provide an number');
        }
        inputArea.value = '';
    })
})

let getOperationValueButton = document.querySelector('.equal')
getOperationValueButton.addEventListener('click', (event) => {
    let secondNumber = inputArea.value;
    if (firstNumber !== undefined && operator !== undefined && secondNumber !== '') {
        clearMessagesList();
        operate(firstNumber, operator, parseFloat(inputArea.value));
    } else if (firstNumber === undefined && secondNumber === undefined || secondNumber === '') {
        clearMessagesList();
        populateMessage('Now provide a number')
    } else if (typeof operator === 'undefined') {
        clearMessagesList();
        populateMessage('Provide an operator')
    }else{
        clearMessagesList();
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

});
document.addEventListener('keydown', (event) => {
    let targetButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '', 'x', '/', '+', '-', '='];
    let buttonClicked = event.key;

    if (targetButtons.includes(buttonClicked)) {
        let btn = findNeededButton(buttonClicked)
        btn.dispatchEvent(new Event('click'));
    } else if (buttonClicked === 'Enter') {
        let btn = findNeededButton('=')
        btn.dispatchEvent(new Event('click'));
    } else if (buttonClicked === 'Backspace') {
        deleteCharacterAction.dispatchEvent(new Event('click'));
    }
    console.log(buttonClicked);
})

const findNeededButton = (text) => {
    let buttons = document.querySelectorAll('button');
    let interestedButton;
    buttons.forEach(button => {
        if (button.textContent === text) {
            interestedButton = button;
        }
    });
    return interestedButton;
}