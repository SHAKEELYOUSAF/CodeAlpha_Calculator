
(function () {
  "use strict";

  const resultEl = document.getElementById("result");
  const expressionEl = document.getElementById("expression");

  // ----- state -----
  let currentInput = "0";
  let previousInput = "";
  let operator = null;
  let shouldResetDisplay = false;
  let justEvaluated = false;
  let expressionString = "";

  function updateDisplay() {
    let displayValue = currentInput;
    if (
      displayValue === "Infinity" ||
      displayValue === "-Infinity" ||
      displayValue === "NaN"
    ) {
      resultEl.textContent = "Error";
      resultEl.classList.add("error");
      return;
    }
    resultEl.classList.remove("error");
    /*if it's a number with many decimals, limit to 10 chars*/
    if (displayValue.length > 14 && !displayValue.includes("e")) {
      // try to parse and round
      const num = parseFloat(displayValue);
      if (!isNaN(num)) {
        displayValue = num.toPrecision(10);
      }
    }
    resultEl.textContent = displayValue;
  }

  function updateExpression() {
    expressionEl.textContent = expressionString;
  }

  function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetDisplay = false;
    justEvaluated = false;
    expressionString = "";
    updateDisplay();
    updateExpression();
  }

  // clear entry (AC becomes CE? we use AC as full clear)
  function clearEntry() {
    currentInput = "0";
    if (!operator) {
      expressionString = "";
    }
    updateDisplay();
    updateExpression();
  }

  // sign toggle
  function toggleSign() {
    if (currentInput === "0") return;
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = "-" + currentInput;
    }
    updateDisplay();
  }

  //percent:divide by 100
  function percent() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    currentInput = String(num / 100);
    updateDisplay();
  }

  //Number handling
  function inputNumber(value) {
    if (justEvaluated && !operator) {
      // start fresh after result
      currentInput = "0";
      expressionString = "";
      justEvaluated = false;
    }

    if (shouldResetDisplay) {
      currentInput = "0";
      shouldResetDisplay = false;
    }

    if (value === ".") {
      if (currentInput.includes(".")) return;
      if (currentInput === "") currentInput = "0";
      currentInput += ".";
    } else {
      if (currentInput === "0" && value !== ".") {
        currentInput = value;
      } else {
        if (currentInput.length >= 15) return; // safety
        currentInput += value;
      }
    }
    updateDisplay();
  }

  //Operator Handling
  function handleOperator(op) {
    const currentNum = parseFloat(currentInput);
    if (isNaN(currentNum) && currentInput !== "-") {
      // if current input is not a number (e.g. error), reset
      clearAll();
      return;
    }

    if (operator && !shouldResetDisplay) {
      // chain calculation
      const result = compute(parseFloat(previousInput), currentNum, operator);
      if (result === "Error" || !isFinite(result)) {
        currentInput = "Error";
        previousInput = "";
        operator = null;
        expressionString = "";
        updateDisplay();
        updateExpression();
        return;
      }
      currentInput = String(result);
      previousInput = String(result);
    } else {
      // store current as previous
      previousInput = currentInput;
    }

    operator = op;
    // build expression string
    const opSymbol =
      op === "×" ? "×" : op === "÷" ? "÷" : op === "+" ? "+" : "−";
    expressionString = `${previousInput} ${opSymbol} `;
    updateExpression();
    shouldResetDisplay = true;
    justEvaluated = false;
    updateDisplay();
  }

  //compute
  function compute(a, b, op) {
    let result;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "×":
        result = a * b;
        break;
      case "÷":
        if (b === 0) return "Error";
        result = a / b;
        break;
      default:
        return "Error";
    }
    if (!isFinite(result)) return "Error";
    return result;
  }

  //evaluate Answer
  function evaluate() {
    if (!operator) {
      // if no operator, just show current
      if (justEvaluated) {
      }
      return;
    }

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    if (isNaN(a) || isNaN(b)) {
      clearAll();
      return;
    }

    const result = compute(a, b, operator);
    if (result === "Error" || !isFinite(result)) {
      currentInput = "Error";
      operator = null;
      previousInput = "";
      expressionString = "";
      updateDisplay();
      updateExpression();
      return;
    }

    // build expression string for display
    const opSymbol =
      operator === "×"
        ? "×"
        : operator === "÷"
          ? "÷"
          : operator === "+"
            ? "+"
            : "−";
    expressionString = `${previousInput} ${opSymbol} ${currentInput} =`;
    updateExpression();

    currentInput = String(result);
    previousInput = "";
    operator = null;
    shouldResetDisplay = true;
    justEvaluated = true;
    updateDisplay();
  }

  //button click dispatcher
  function handleButtonClick(value) {
    if (value === "clear") {
      clearAll();
      return;
    }
    if (value === "sign") {
      toggleSign();
      return;
    }
    if (value === "percent") {
      percent();
      return;
    }
    if (value === "=") {
      evaluate();
      return;
    }
    if (["+", "-", "×", "÷"].includes(value)) {
      handleOperator(value);
      return;
    }
    // numbers & dot
    inputNumber(value);
  }

  //attach events to button
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const value = btn.dataset.value;
      if (value !== undefined) {
        handleButtonClick(value);
      }
    });
  });

  //keyboard support
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    // prevent default for calculator keys to avoid page scroll / input
    const controlKeys = [
      "Enter",
      "Escape",
      "Backspace",
      "Delete",
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      "%",
    ];
    if (controlKeys.includes(key) || key === "=" || key === "Enter") {
      e.preventDefault();
    }

    if (key >= "0" && key <= "9") {
      handleButtonClick(key);
      return;
    }
    if (key === ".") {
      handleButtonClick(".");
      return;
    }
    if (key === "+") {
      handleButtonClick("+");
      return;
    }
    if (key === "-") {
      handleButtonClick("-");
      return;
    }
    if (key === "*") {
      handleButtonClick("×");
      return;
    }
    if (key === "/") {
      handleButtonClick("÷");
      return;
    }
    if (key === "Enter" || key === "=") {
      evaluate();
      return;
    }
    if (key === "Escape" || key === "Delete") {
      clearAll();
      return;
    }
    if (key === "Backspace") {
      if (currentInput.length > 1 && !shouldResetDisplay) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      } else if (currentInput.length === 1 && currentInput !== "0") {
        currentInput = "0";
        updateDisplay();
      } else if (currentInput === "0" && !shouldResetDisplay) {
      }
      return;
    }
    if (key === "%") {
      percent();
      return;
    }
  });

  // initialize display
  clearAll();
})();
