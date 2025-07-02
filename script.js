const operations = {
    '*': (num1, num2) => num1 * num2,
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '/': (num1, num2) => {
        if (num2 === 0) {
            return 'You cannot divide on zero';
        }
        return num1 / num2;
    },
}
let operate = (num1, operator, num2) => {
    return operations[operator](num1, num2);
}

console.log(operate(12, '*', 10));

let createButtonsBlockElement = (element) => {
    return  document.createElement(`${element}`);

}
let fillWithButtons = () => {

    let buttonsBlock = document.querySelector('.buttons-block');
    for (let i = 0; i < 10; i++) {
        let button = createButtonsBlockElement('button');
        button.textContent = `${i}`
        buttonsBlock.appendChild(button);
    }
    let equalSign = createButtonsBlockElement('button');
    equalSign.textContent = '.';
    buttonsBlock.appendChild(equalSign);

};

document.addEventListener('DOMContentLoaded', fillWithButtons);