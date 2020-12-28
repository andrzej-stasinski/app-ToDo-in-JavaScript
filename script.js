'use strict'

// state
let mainContainer = null
let tasks = [
    {name: 'Wyrzucić śmieci', isCompleted: true},
    {name: 'Kupić piwo', isCompleted: false},
]
let newToDoName = 'aaa'

// form
// input
const renderNewTaskInput = function() {
    const input = document.createElement('input')
    input.value = newToDoName
    input.addEventListener('input', function(e) {
        const value = e.target.value
        newToDoName = value
        console.log(value)
        update()
        
    })
    setTimeout(() => input.focus(),0)
    return input
}
// button
const renderNewTaskButton = function() {
    const button = document.createElement('button')
    button.textContent = 'ADD in FORM'

    return button
}
const renderNewTaskForm = function() {
    const container = document.createElement('form')

    const renderInput = renderNewTaskInput()
    const renderButton = renderNewTaskButton()
    container.appendChild(renderInput)
    container.appendChild(renderButton)

    return container 
}
// Lista elementów
const appendArray = function(array, container) {
    array.forEach(el => {
        container.appendChild(el)
    });
}
const renderTask = function(task) {
    const container = document.createElement('li')
    console.log(task.name)
    container.textContent = task.name
    console.log(container)
    if(task.isCompleted) {
        container.classList.add('task_completed')
    }
    return container  
}
const renderTaskList = function(tasks) {
    const container = document.createElement('ol')
    const tasksElements = tasks.map(task => {
        console.log(task)
        return renderTask(task)
    })
    console.log(tasksElements)
    appendArray(tasksElements, container)

    return container     
}

// render
const render = function() {
    const container = document.createElement('div')

    const renderElementForm   = renderNewTaskForm()
    const renderTasksElements = renderTaskList(tasks)

    container.appendChild(renderElementForm)
    container.appendChild(renderTasksElements)

    return container    
}
const update = function() {
    mainContainer.innerHTML = ''
    const app = render()
    mainContainer.appendChild(app)
}
const init = function(selector) {
    const container = document.querySelector(selector)
    mainContainer = container
    if(!mainContainer) return console.log('Selector not exists')
    const app = render()
    mainContainer.appendChild(app)
}

// init()
init('.root')



































