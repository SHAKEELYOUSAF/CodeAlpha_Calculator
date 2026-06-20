# CodeAlpha_Calculator
# Calculator Web Application

## Overview

This project is a modern, responsive, and user-friendly Calculator Web Application developed using **HTML5, CSS3, and Vanilla JavaScript**. The calculator performs basic arithmetic operations while providing a clean user interface, keyboard support, error handling, and real-time expression display.

The application is designed with accessibility and responsiveness in mind, ensuring a smooth experience across desktop and mobile devices.

---

## Features

### Arithmetic Operations

* Addition (+)
* Subtraction (−)
* Multiplication (×)
* Division (÷)

### Additional Functions

* All Clear (AC)
* Positive/Negative Toggle (±)
* Percentage Calculation (%)
* Decimal Number Support
* Continuous (Chain) Calculations
* Real-Time Expression Display

### Keyboard Support

Users can operate the calculator directly from the keyboard:

| Key          | Function          |
| ------------ | ----------------- |
| 0-9          | Number Input      |
| +            | Addition          |
| -            | Subtraction       |
| *            | Multiplication    |
| /            | Division          |
| Enter / =    | Calculate Result  |
| Esc / Delete | Clear Calculator  |
| Backspace    | Delete Last Digit |
| %            | Percentage        |

### Error Handling

The calculator prevents invalid mathematical operations such as:

* Division by zero
* Infinity values
* NaN (Not a Number)

When an invalid operation occurs, an appropriate **Error** message is displayed.

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Design Features

* Responsive Layout
* CSS Grid System
* Modern Dark Theme
* Interactive Button Animations
* Hover and Click Effects
* Mobile-Friendly Design

---

## Project Structure

```
CodeAlpha_Calculator/
│
├── index.html
├── Calculator.css
├── Calculator.js
└── README.md
```

### File Description

#### index.html

Provides the structure of the calculator including:

* Display Screen
* Expression Area
* Result Area
* Calculator Buttons

#### Calculator.css

Responsible for:

* Layout Design
* Styling Components
* Responsive Design
* Animations and Effects
* Color Themes

#### Calculator.js

Handles:

* User Input Processing
* Arithmetic Calculations
* Expression Management
* Keyboard Events
* Error Handling
* State Management

---

## User Interface Components

### Display Section

Contains:

* Expression Display
* Result Display

### Functional Buttons

* AC (All Clear)
* ± (Sign Toggle)
* % (Percentage)

### Operator Buttons

* Addition
* Subtraction
* Multiplication
* Division

### Equal Button

Calculates and displays the final result.

---

## Core Functionalities

### State Management

The application maintains:

* Current Input
* Previous Input
* Selected Operator
* Expression String
* Evaluation Status

### Expression Tracking

Users can view the complete mathematical expression before and after evaluation.

Example:

```
25 × 4 =
100
```

### Precision Handling

Large decimal values are automatically formatted to maintain readability and prevent display overflow.

---

## Responsive Design

The calculator adapts to different screen sizes:

* Desktop Computers
* Laptops
* Tablets
* Mobile Devices

CSS Media Queries ensure an optimized user experience across all devices.

---

## Accessibility Features

* Semantic HTML Structure
* ARIA Labels
* Keyboard Navigation Support
* User-Friendly Interface

---

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Ensure the following files are present:

   * index.html
   * Calculator.css
   * Calculator.js
4. Open `index.html` in any modern web browser.

No additional libraries or installations are required.

---

## Future Enhancements

Possible improvements include:

* Scientific Calculator Functions
* Calculation History
* Memory Operations (M+, M-, MR, MC)
* Theme Switching (Dark/Light Mode)
* Keyboard Shortcut Guide
* Calculation Export Feature

---

## Author

Developed as a front-end JavaScript project to demonstrate:

* DOM Manipulation
* Event Handling
* State Management
* Responsive UI Design
* JavaScript Logic Implementation



