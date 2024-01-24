const generatedPassword = document.getElementById('generated-password');
const copied = document.getElementById('copied');
const slider = document.getElementById('range');
const rangeLength = document.getElementById('range-length');
const upperCaseCheckBox = document.getElementById('uppercase-checkbox');
const lowerCaseCheckBox = document.getElementById('lowercase-checkbox');
const numberCheckBox = document.getElementById('numbers-checkbox');
const symbolCheckBox = document.getElementById('symbols-checkbox');
const strengthRating = document.getElementById('strength-rating');
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`";



function copy() {
    generatedPassword.select();
    generatedPassword.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(generatedPassword.value);
    if (generatedPassword.value.length > 1) {
        copied.textContent = 'copied';
    }
}

const min = slider.min;
const max = slider.max;
const value = slider.value;
rangeLength.textContent = value;
slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${(value - min) / (max - min) * 100}%, #18171F ${(value - min) / (max - min) * 100}%, #18171F 100%)`;

slider.oninput = function () {
    this.style.background = `linear-gradient(to right, #A4FFAF  0%, #A4FFAF ${(this.value - min) / (this.max - this.min) * 100}%, #18171F ${(this.value - min) / (this.max - this.min) * 100}%, #18171F 100%)`;
    rangeLength.textContent = this.value;
   
};

function generatePassword(length) {
    let result = '';
    const availableCharacters = getAvailableCharacters();

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        result += availableCharacters.charAt(randomIndex);
    }

    return result;
}

function getAvailableCharacters() {
    let characters = '';

    if (upperCaseCheckBox.checked) {
        characters += upperCase;
    }
    if (lowerCaseCheckBox.checked) {
        characters += lowerCase;
    }
    if (numberCheckBox.checked) {
        characters += numbers;
    }
    if (symbolCheckBox.checked) {
        characters += symbols;
    }

    return characters;
}

function generateAndDisplayPassword() {
    var passwordLength = parseInt(slider.value);
    const newPassword = generatePassword(passwordLength);
    generatedPassword.value = newPassword;
    checkStrength() 
   
}

const generateButton = document.querySelector('.btn-generate');
generateButton.addEventListener('click', generateAndDisplayPassword);


const bar1 = document.getElementById('1');
const bar2 = document.getElementById('2');
const bar3 = document.getElementById('3');
const bar4 = document.getElementById('4');

function checkStrength() {
    const isChecked = (checkbox) => checkbox.checked;
    const sliderValue = parseInt(slider.value);
    const checkedCount = [isChecked(upperCaseCheckBox), isChecked(lowerCaseCheckBox), isChecked(numberCheckBox), isChecked(symbolCheckBox)].filter(Boolean).length;
    if (sliderValue < 8 ) {
        setStrength("TOO WEAK!", "#F64A4A", 1);
    } else if (sliderValue >= 8 &&  checkedCount == 1 || checkedCount == 2 ) {
        setStrength("WEAK", "#FB7C58", 2);
    } else if (sliderValue > 8 && checkedCount == 3) {
        setStrength("MEDIUM", "#F8CD65", 3);
    } else if (sliderValue >= 10 && checkedCount === 4) {
        setStrength("STRONG", "#A4FFAF", 4);
    }
    
}

function setStrength(strengthText, barColor, numBars) {
    strengthRating.textContent = strengthText;

    for (let i = 1; i <= 4; i++) {
        const bar = document.getElementById(`${i}`);
        bar.style.backgroundColor = "";
        bar.style.border = i <= numBars ? "none" : "2px solid #E6E5EA";
    }

    for (let i = 1; i <= numBars; i++) {
        const bar = document.getElementById(`${i}`);
        bar.style.backgroundColor = barColor;
    }
}


