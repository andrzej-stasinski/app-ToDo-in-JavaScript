'use strict'

const renderInput = function() {
    const input = document.createElement('input')
    return input
}

const render = function() {
    const div = document.createElement('div')
    div.textContent = 'div - my Div'

    const input = renderInput()
    div.appendChild(input)
    
    return div    
}

const init = function(selector) {
    const container = document.querySelector(selector)
    const app = render()
    container.appendChild(app)
}

init('.root')



































