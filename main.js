import './style.css'

const FIXED_LEN = 3

const App = document.querySelector('#app');



class Calculator {
    constructor() {
        // drow the calcultor in the html page
        this.draw();
        this.display = document.querySelector('.display');
        this.btns = document.querySelector('.btns');
        this.num1 = null; // initialize the first part of the operation at null;
        this.num2 = null; // initialize the second part of the operation at null;
        this.operation = ''; // no opeation at the start.
        this.clear();
        this.listenToClick();
    }

    /**
     * Add an event listener on the parent of the btns elements
     * When a click happen, data is shown on the screen
     */
    listenToClick() {
        this.btns.addEventListener('click', (e) => {
            this.addToDisplay(e.target.textContent)
        })
    }

    /**
     * add a value to the display (screen)
     * if equal is clicked, the opearation will be evaluated
     */
    addToDisplay (str) {
        // if operation is falsy and is numeria, add to num1
        // if operation is truthy and is numeria, add to num2
        const isNumeric = /[0-9.]/.test(str);
        if(!isNumeric) {
            // reset, / , + , - , *, =
            this.doOperation(str)
        } else {
          console.log(this.operation + ' => ' + this.operation)
            // is it the number before the operation is designed or after it : num1 or num2?
            if(this.operation === null) {
                this.num1 = !this.num1 ? str : this.num1 + str;
            } else {
                this.num2 = !this.num2 ? str : this.num2 + str;
            }
            // updating display
            this.updateDisplay(str);
        }
    }

    updateDisplay(str) {
        this.display.textContent = this.display.textContent === '0'
              ? str
              : this.display.textContent + str;
    }

    doOperation(str) {
          switch(str) {
            case '+':
            case '/':
            case '*':
            case '-':
              this.operation = str;
              this.updateDisplay(str);
              break;
            case 'reset':
              this.clear();
              break;
            case '=':
              console.log('give me the result');
              // a number + equal = number, no error
              if(this.operation === null ) return;

                // an operation without 2 members
              if(this.num2 === null ) {
                    this.display.classList.add('warning');
                    setTimeout(() => {
                        this.display.classList.remove('warning');
                    })
                    return;
              }

              // we can do the operation
              this.operate();
              break;

              // remove last input
              case 'del':
					this.doDeleteOne()
                  break;
           } // switch
    }

    operate() {
        // do not use eval, it's not safe.
        switch(this.operation) {
            case '/':
              if(this.num2 === "0" ) {
                    this.display.classList.add('warning');
                    setTimeout(() => {
                        this.display.classList.remove('warning');
                    })
                    return;
              }

              this.displayCalcResult((parseFloat(this.num1) / parseFloat(this.num2)).toFixed(FIXED_LEN))
              break;
            case '*':
              this.displayCalcResult((parseFloat(this.num1) * parseFloat(this.num2)).toFixed(FIXED_LEN))
              break;
            case '-':
              this.displayCalcResult((parseFloat(this.num1) - parseFloat(this.num2)).toFixed(FIXED_LEN))
              break;
            case '+':
              this.displayCalcResult((parseFloat(this.num1) + parseFloat(this.num2)).toFixed(FIXED_LEN))
              break;
        }
    }


	doDeleteOne() {
		// take off 1 char from this.display;
                  // if num2, take off 1 char from num2
                  // if num2 is null, take of operation if not null
                  // take off num1 last char if not 0;
                  // do nothing if num1 is 0;
		// nothing to delete
		if(this.display.textContent === '0') return;
		// One char
		if(this.display.textContent.length === 1 
			|| (this.num1.length === 1 && this.operation === null)) {
			this.clear();
			return;
		}
		// num2
		
		if(this.operation === null && this.num1.length > 1)
		{
			this.num1 = this.removeLastChar(this.num1);
			
		} else {		
			if(this.num2 === null) {
				this.operation === null 
				? this.num1 = this.removeLastChar(this.num1)
				: this.operation = null;
			} else {
				this.num2.length === 1
				? this.num2 = null
				: this.num2 = this.removeLastChar(this.num2)
			}
		}
		
		// take off last char in the display
		this.display.textContent = this.removeLastChar(this.display.textContent)
	}

	/**
	* Remove the last char of a string
	* @param {string} value : the string to take one char off
	* @return {string} the modified string;
	*/
	removeLastChar(value) {
		return value.substring(0,value.length-1)
	}
    /**
     * Show the calculation result.
     * The value is put in num1 so we can perform another operation on this result.
     * The other values are reinitialized so we can continue to make new operation.
     */
    displayCalcResult(result) {
              this.num1 = result;
              this.num2 = null;
              this.operation = null;
              this.display.textContent = this.num1.endsWith('.000') ? Number(this.num1) : this.num1;
    }

    // clear the screen
    clear() {
        this.display.textContent = '0';
        this.num1 = null;
        this.num2 = null;
        this.operation = null;
    }

    draw() {
        App.innerHTML = `
          <div class="container">
              <div class="menu center">
                  Menu
              </div>
              <div class="display center">
                  Display
              </div>
              <div class="menu_btns center">
                  <ul class="btns">
                        <li class="btn" data-value="7">7</li>
                        <li class="btn" data-value="8">8</li>
                        <li class="btn" data-value="9">9</li>
                        <li class="btn action" data-value="del">del</li>
                        <li class="btn" data-value="4">4</li>
                        <li class="btn" data-value="5">5</li>
                        <li class="btn" data-value="6">6</li>
                        <li class="btn op" data-value="7">+</li>
                        <li class="btn" data-value="1">1</li>
                        <li class="btn" data-value="2">2</li>
                        <li class="btn" data-value="3">3</li>
                        <li class="btn op" data-value="-">-</li>
                        <li class="btn" data-value=".">.</li>
                        <li class="btn" data-value="0">0</li>
                        <li class="btn op" data-value="/">/</li>
                        <li class="btn op" data-value="*">*</li>
                        <li class="btn action reset" data-value="reset">reset</li>
                        <li class="btn action equal" data-value="=">=</li>




                  </ul/>

              </div>

          </div>
        `
    }
}

const calc = new Calculator();
