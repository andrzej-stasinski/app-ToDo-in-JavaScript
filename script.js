'use strict'


// state
// -------------------------------
let mainContainer = null
let tasks = [
    {name: 'Wyrzucić śmieci', isCompleted: true},
    {name: 'Kupić piwo', isCompleted: false},
]
let newToDoName = ''

// form 
// ---------------------------------
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
    button.addEventListener('click', function() {
        console.log('click')
    })
    return button
}
// form
const renderNewTaskForm = function() {
    const container = document.createElement('form')

    const renderInput = renderNewTaskInput()
    const renderButton = renderNewTaskButton()

    container.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log('submit')
        tasks = tasks.concat({
            name: newToDoName,
            isCompleted: false
        })

        newToDoName = ''
        update()        
    })

    container.appendChild(renderInput)
    container.appendChild(renderButton)
    return container 
}
// Lista elementów
// -----------------------------------
const appendArray = function(array, container) {
    array.forEach(el => {
        container.appendChild(el)
    });
}
const renderTask = function(task) {
    const container = document.createElement('li')
    container.textContent = task.name
    container.classList.add('todo__task')
    if(task.isCompleted) {
        container.classList.add('task__completed')
    }
    container.addEventListener('click', function() {
        console.log('click')
        console.log(task.name)
        task.isCompleted = !task.isCompleted

        update()
    })
    return container  
}
const renderTaskList = function(tasks) {
    const container = document.createElement('ol')
    const tasksElements = tasks.map(task => {
        return renderTask(task)
    })
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



































