document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');

    let currentInput = '';
    let operator = '';
    let operand1 = null;
    let isResultDisplayed = false;

    const updateDisplay = (value) => {
        display.textContent = value || '0';
    };

    const performCalculation = () => {
        const num1 = operand1;
        const num2 = parseFloat(currentInput);
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return num1 / num2;
            default: return num2;
        }
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value >= '0' && value <= '9' || value === '.') {
                if (isResultDisplayed) {
                  
                    currentInput = value;
                    updateDisplay(value);
                    isResultDisplayed = false;
                } else {
                    currentInput += value;
                    updateDisplay(currentInput);
                }
            } else if (value === 'C') {
              
                currentInput = '';
                operator = '';
                operand1 = null;
                updateDisplay('0');
                isResultDisplayed = false;
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operator) {
                   
                    if (currentInput) {
                        operand1 = performCalculation();
                        updateDisplay(operand1 + ' ' + value);
                        currentInput = '';
                    }
                } else {
                    
                    operand1 = parseFloat(currentInput) || 0;
                    updateDisplay(operand1 + ' ' + value);
                    currentInput = '';
                }
                operator = value;
                isResultDisplayed = false;
            }
        });
    });

    equalsButton.addEventListener('click', () => {
        if (operator && currentInput) {
            const result = performCalculation();
            updateDisplay(result);
            operand1 = result; 
            currentInput = '';
            isResultDisplayed = true; 
        }
    });

    clearButton.addEventListener('click', () => {
      
        currentInput = '';
        operator = '';
        operand1 = null;
        updateDisplay('0');
        isResultDisplayed = false;
    });
});