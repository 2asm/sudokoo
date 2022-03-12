let oldValue = ""

const inputs = document.getElementsByClassName("Input")
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function (event) {
        if (validateInput(event.target.value)) {
            oldValue = event.target.value
        } else if (!validateInput(event.target.value) && validateInput(event.target.value.slice(-1))) {
            event.target.value = event.target.value.slice(-1)
            oldValue = event.target.value.slice(-1)
        } else {
            event.target.value = oldValue
        }
    })
}

function validateInput(value) {
    return /^\d*$/.test(value) && (value === '' || parseInt(value) > 0 && parseInt(value) <= 9);
}

let grid_sol = [];

(async () => {
    const res = await fetch("https://sudokoo.herokuapp.com/sudoku", {method: 'POST'})
    const content = await res.json()
    grid_sol = content[0]
    const grid = content[1]
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++){
            let id = "c" + i + j
            if (grid[i][j] !== 0) {
                el = document.getElementById(id)
                el.value = grid[i][j]
                el.style.color = "black"
                el.readOnly = true
            }
        }
    }
})()

document.getElementById("checkbtn").onclick = () => {
    let sudokuData = []
    msgEl = document.getElementById("msg")
    for (let i=0; i<9; i++) {
        sudokuData[i] = []
        for (let j=0; j<9; j++){
            let id = "c" + i + j
            el = document.getElementById(id)
            if (!el.value) {
                msgEl.innerHTML = "<div><strong>Warning!</strong> Sudoku Incomplete.</div>"
                msgEl.style.color = "orange"
                setTimeout(() => {
                    msgEl.innerHTML = ""
                }, 2000)
                return
                sudokuData[i][j] = 0
            }
            sudokuData[i][j] = Number(el.value)
        }
    }
    if (JSON.stringify(grid_sol) === JSON.stringify(sudokuData)){
        msgEl.innerHTML += "<div><strong>Congratulations!</strong> Sudoku completed.</div>\nstart new <img onclick=\"location.reload()\" style=\"vertical-align:middle\" height=\"20\" width=\"20\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABmUlEQVRIie3Wz05TQRTH8Q9rt7RqKE1qxPAibkyMQlADJsSlbgzhFXwKY/yzIUgDKBsTX0XZQRqlUdZUoS5m6i2lem+nF1b8krOZOTPfe+bOOXO41AVpYgTfOuZxG7O4Gsdb2MUn7GCvrI+r4x066OZYB68wPS50AYd9m65hETdwJdrNOLbe93GHuJsKvY7juNGWEHmeGtiMa07wNAU8gRdYTli7EsG/cT8FPo5Whch/oHLR8J0If5Pn+CBaWaoLF+7If6Ku4CBamUfTu2wr/3JoyvKxWSJ4UZYZZ/TQ2WJQ1pHPxP2+Dk5M4vsQcFtWFlPUf4KDtpHn8HEM8CS+Ddmzjeqg826cnBkD2K97Q8BDf+F2nHxUEpiCl3Y1zyFBhdK0Kkv4WonwQoXprRD1dongQqrip5xqc16aE560EzxPWP9EeFJHaa3+6lkEd4V62yiwpiHkfldoIq6lgAntS+/YO0J7s4RbTrc+j/Eev2Rv8EIqtKcaXirW7B3htQIZMco/qAmV6I4Q5VQcb+ELPuMD9kfY81Lnrz8ZRo+Yt/Ln7AAAAABJRU5ErkJggg==\"/>"
        msgEl.style.color = "green"
    } else {
        msgEl.innerHTML = "<div><strong>Wraning!</strong> Wrong solution.</div>"
        msgEl.style.color = "red"
        setTimeout(() => {
            msgEl.innerHTML = ""
        }, 2000)
    }
}
