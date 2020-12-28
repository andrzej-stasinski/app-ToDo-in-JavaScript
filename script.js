'use strict'

let tasks = [
    {name: 'Wyrzucić śmieci'}
]

const appendArray = function(array, container) {
    array.forEach(el => {
        container.appendChild(el)
    });
}
const renderInput = function() {
    const input = document.createElement('input')
    return input
}

const renderTask = function(task) {
    const container = document.createElement('div')
    console.log(task.name)
    container.textContent = task.name
    console.log(container)
    return container  
}

const renderTaskList = function() {
    const container = document.createElement('div')
    const tasksElements = tasks.map(task => {
        console.log(task)
        return renderTask(task)
    })
    console.log(tasksElements)
    appendArray(tasksElements, container)
    return container     
}

const render = function() {
    const container = document.createElement('div')
    container.textContent = 'div - my Div'

    const input = renderInput()
    const renderTasksElements = renderTaskList()

    container.appendChild(input)
    container.appendChild(renderTasksElements)

    return container    
}

const init = function(selector) {
    const container = document.querySelector(selector)
    if(!container) return console.log('Selector not exists')
    const app = render()
    container.appendChild(app)
}

// init()
init('.root')



































