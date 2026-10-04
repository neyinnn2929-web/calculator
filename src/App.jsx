import { useEffect, useState } from 'react'
function App() {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNumber, setWaitingForNumber] = useState(false)

  const handleNumber = (number) => {
    if (display === 'Error' || waitingForNumber) {
      setDisplay(number)
      setWaitingForNumber(false)
    } else {
      setDisplay(display === '0' ? number : display + number)
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = Number(display)

    if (operator && waitingForNumber) {
      setOperator(nextOperator)
      return
    }

    if (firstNumber === null) {
      setFirstNumber(inputValue)
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator)
      setDisplay(String(result))
      setFirstNumber(result)
    }

    setOperator(nextOperator)
    setWaitingForNumber(true)
  }

  const calculate = (first, second, operation) => {
    if (operation === '+') return first + second
    if (operation === '-') return first - second
    if (operation === '*') return first * second

    if (operation === '/') {
      if (second === 0) return 'Error'
      return first / second
    }

    return second
  }

  const handleEquals = () => {
    if (operator === null || firstNumber === null) {
      return
    }

    const secondNumber = Number(display)
    const result = calculate(firstNumber, secondNumber, operator)

    setDisplay(String(result))
    setFirstNumber(null)
    setOperator(null)
    setWaitingForNumber(true)
  }

 useEffect(() => {
  const handleKeyDown = (event) => {
    const key = event.key

    if (key >= '0' && key <= '9') {
      handleNumber(key)
    } else if (key === '+') {
      handleOperator('+')
    } else if (key === '-') {
      handleOperator('-')
    } else if (key === '*') {
      handleOperator('*')
    } else if (key === '/') {
      event.preventDefault()
      handleOperator('/')
    } else if (key === 'Enter' || key === '=') {
      handleEquals()
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      handleClear()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '−'],
    ['0', 'C', '=', '+'],
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Calculator
        </h1>

        <div className="bg-gray-900 rounded-2xl p-5 shadow-xl">

          <div className="bg-gray-200 rounded-xl p-5 mb-4 text-right">
            <div className="text-3xl font-bold text-gray-800 break-words">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">

            {buttons.flat().map((button) => {
              const isOperator = ['+', '−', '×', '÷'].includes(button)
              const isEquals = button === '='
              const isClear = button === 'C'

              return (
                <button
                  key={button}
                  onClick={() => {
                    if (button >= '0' && button <= '9') {
                      handleNumber(button)
                    } else if (isOperator) {
                      const operatorValue = {
                        '+': '+',
                        '−': '-',
                        '×': '*',
                        '÷': '/'
                      }

                      handleOperator(operatorValue[button])
                    } else if (isEquals) {
                      handleEquals()
                    } else if (isClear) {
                      handleClear()
                    }
                  }}
                  className={`h-16 rounded-xl text-xl font-bold transition active:scale-95 ${
                    isEquals
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : isClear
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : isOperator
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-white text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {button}
                </button>
              )
            })}

          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mt-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            How to Use
          </h2>

          <p className="text-gray-600 mb-2">
            Click the number buttons to enter numbers.
          </p>

          <p className="text-gray-600 mb-2">
            Choose an operator: +, −, ×, or ÷.
          </p>

          <p className="text-gray-600 mb-2">
            Click = to see the result.
          </p>

          <p className="text-gray-600">
            Click C to clear the calculator.
          </p>
        </div>

      </div>

    </div>
  )
}

export default App