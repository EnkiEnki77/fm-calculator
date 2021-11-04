let runningTotal = 0 //the total of operations
let buffer = '0'; //Number that gets displayed on the screen
let previousOperator = null; //keeps track of the last operator pressed
const screen = document.querySelector('.answer')

//determines whether a button clicked is a number or character
let buttonClick = (value) => {
    //attempts to parse event.target.innerText of the button into an integer and if it comes back as NaN the handleSymbol function is called.
    //with value passed to it if not the handleNumber function is called with value passed to it
    if (isNaN(parseInt(value))) {
        console.log('symbol')
        handleSymbol(value)
    }
    else {
        handleNumber(value)
    }
    //puts the value on the screen after it is run through the above functions
    rerender()
}

//function that is called from buttonClick
let handleSymbol = (value) => {

    //takes the value passed to handleSymbol from buttonClick and runs it through different cases. If a case returns true it runs the
    //expressions of that case, if not runs the expressions of default
    switch (value) {
        //clears all of the main variables back to their initial values, in turn setting the screen to zero
        case 'C':
            runningTotal = 0;
            buffer = '0'
            previousOperator = null;
            break;
        //Deletes one character from the screen, unless its just zero
        case '←':
            //if theres only one character sets it to zero, if its already zero does nothing
            if (buffer.length === 1) {
                buffer = '0'
            }
            //expression that takes away a character. Using the substring method it makes the initial start the first indice of buffer
            //then it makes the ending buffer.length - 1 which effectively chops off whatever the last indice was
            else { buffer = buffer.substring(0, buffer.length - 1) }
            break;
        //finalizes the operation making the answer show on the screen
        case '=':
            //if an operator was not passed to previousOperator makes = do nothing
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = '' + runningTotal
            runningTotal = 0;
            break;
        default:
            handleMath()
            break;

    }

}

let handleNumber = (value) => {
    if (buffer === '0') {
        buffer = value
    }
    else {
        buffer += value
    }
    
}


//function that allows the changed buffer to be displayed on the screen
let rerender = () => {
    screen.innerText = buffer;
}

let handleMath = (value) => {
    let intBuffer = parseInt(buffer)
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }

    console.log(runningTotal)
    previousOperator = value

    buffer = '0'
}



let flushOperation = (intBuffer) => {
    switch (previousOperator) {
        case '÷':
            runningTotal /= intBuffer
            break;
        case '×':
            runningTotal *= intBuffer
            break;
        case '-':
            runningTotal -= intBuffer
            break;
        default:
            runningTotal += intBuffer
            break;
    }
}

//grabs the parent container of the buttons. and adds a click event. the event function takes an event parameter, allowing you to specify
//a child as the target using event.target
document.querySelector('.buttons').addEventListener('click', (event) => {
    buttonClick(event.target.innerText) //calls the buttonClick function, which parses whether a button is a number or character and passes 
    //the event.target as a parameter
})

