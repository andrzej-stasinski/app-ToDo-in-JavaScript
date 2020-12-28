'use strict'

// state
// -------------------------------
let mainContainer = null
let tasks = [
    {id: 1, name: 'Wyrzucić śmieci', isCompleted: true},
    {id: 2, name: 'Kupić piwo', isCompleted: false},
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

        const id = Math.floor(Math.random() * 1000)
        tasks = tasks.concat({
            id: id,
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
// ===============================
const appendArray = function(array, container) {
    array.forEach(el => {
        container.appendChild(el)
    });
}
// delete - button
const onTaskDelete = function(id) {
    tasks = tasks.filter(task => task.id !== id)
    update()
}
const renderButtonDelete = function(id) {
    const button = document.createElement('button')
    button.textContent = '[ X ]'
    button.classList.add('task__button--color')
    button.addEventListener('click', function() {
        console.log('id ', id)
        onTaskDelete(id)
    })
    return button
}
// task name - div
const renderTaskName = function() {
    const taskName = document.createElement('div')
    return taskName
}
// wrapper task
const renderTaskWrapper = function() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('task_wrapper')
    return wrapper
}
const renderTask = function(task) {
    const container = document.createElement('li')

    const renderElementName = renderTaskName()
    renderElementName.textContent = task.name
    // container.textContent = task.name

    renderElementName.classList.add('todo__task')
    if(task.isCompleted) {
        renderElementName.classList.add('task__completed')
    }
    renderElementName.addEventListener('click', function() {
        console.log('click')
        console.log(task.name)
        task.isCompleted = !task.isCompleted

        update()
    })

    const elementButtonDelete = renderButtonDelete(task.id)

    const wrapperElement = renderTaskWrapper()
    container.appendChild(wrapperElement)

    wrapperElement.appendChild(renderElementName)
    wrapperElement.appendChild(elementButtonDelete)
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



































