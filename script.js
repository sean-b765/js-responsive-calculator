class Calculator {
	constructor(txtPreviousOperand, txtCurrentOperand) {
		this.txtPreviousOperand = txtPreviousOperand
		this.txtCurrentOperand = txtCurrentOperand

		// Initialise
		this.reset()
	}

	// AC / Reset
	reset() {
		this.txtCurrentOperand.innerHTML = '0'
		this.txtPreviousOperand.innerHTML = ''
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = null
		console.log(this.txtCurrentOperand)
	}

	// Delete a number
	delete() {
		this.currentOperand = this.currentOperand.substring(
			0,
			this.currentOperand.length - 1
		)
	}

	// Click number event
	inputNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return

		this.currentOperand += number
	}

	chooseOperation(operation) {
		this.operation = operation
		this.previousOperand = this.currentOperand

		this.currentOperand = ''
	}

	equate() {
		if (!this.operation) return

		let result = 0
		switch (this.operation) {
			case 'multiplication':
				result =
					parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
				break
			case 'division':
				result =
					parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
				break
			case 'addition':
				result =
					parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
				break
			case 'subtraction':
				result =
					parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
				break
		}
		console.log(result)
		this.currentOperand = `${result}`

		this.previousOperand = ''
		this.operation = null
	}

	updateScreen() {
		this.txtCurrentOperand.innerHTML = `${
			this.currentOperand ? this.currentOperand : '0'
		}`

		const operationString = formatOperation(this.operation)

		this.txtPreviousOperand.innerHTML = `${this.previousOperand} ${
			operationString ? operationString : ''
		}`
	}
}

let theme = 1

const btnToggler = document.getElementById('btnToggler')
const wrapper = document.getElementById('wrapper')

const btnReset = document.getElementById('btnReset')
const btnDel = document.getElementById('btnDel')
const btnPeriod = document.getElementById('btnPeriod')
const btnEquals = document.getElementById('btnEquals')

const txtPrevious = document.querySelector('span.previous')
const txtCurrent = document.querySelector('span.current')

const operators = document.getElementsByClassName('[data-operator]')
const digits = document.getElementsByClassName('[data-digit]')

const calculator = new Calculator(txtPrevious, txtCurrent)

for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener('click', () => {
		calculator.chooseOperation(operators[i].getAttribute('data-operation'))
		calculator.updateScreen()
	})
}

for (let i = 0; i < digits.length; i++) {
	digits[i].addEventListener('click', () => {
		const digit = parseInt(digits[i].innerHTML)

		calculator.inputNumber(digit)
		calculator.updateScreen()
	})
}

btnEquals.addEventListener('click', () => {
	calculator.equate()
	calculator.updateScreen()
})

btnPeriod.addEventListener('click', () => {
	calculator.inputNumber('.')
	calculator.updateScreen()
})

btnDel.addEventListener('click', () => {
	calculator.delete()
	calculator.updateScreen()
})

btnReset.addEventListener('click', () => {
	calculator.reset()
	calculator.updateScreen()
})

const formatOperation = (operation) => {
	if (operation === 'multiplication') return 'x'
	if (operation === 'division') return '/'
	if (operation === 'addition') return '+'
	if (operation === 'subtraction') return '-'
}

btnToggler.addEventListener('click', () => {
	theme++
	if (theme > 3) theme = 1

	btnToggler.classList.remove('theme1')
	btnToggler.classList.remove('theme2')
	btnToggler.classList.remove('theme3')
	wrapper.classList.remove('wrapper--theme1')
	wrapper.classList.remove('wrapper--theme2')
	wrapper.classList.remove('wrapper--theme3')

	btnToggler.classList.add(`theme${theme}`)
	wrapper.classList.add(`wrapper--theme${theme}`)
})
