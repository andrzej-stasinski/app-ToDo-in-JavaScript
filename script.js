'use strict'

const initApp = function() {

    // state
    // -------------------------------
    let AppKey = ''
    let mainContainer = null
    let tasks = []
    let newToDoName = ''
    const maxInput = 25

    // form 
    // ---------------------------------
    // input
    const renderNewTaskInput = function() {
        const input = document.createElement('input')
        input.classList.add('task-form__input')
        input.value = newToDoName

        input.addEventListener('input', function(e) {
            const value = e.target.value
            if(value.length > maxInput) {
                input.maxLength = maxInput + 1
                input.classList.add('input-error')
            } else {
                input.classList.remove('input-error')
                    
            } 
            newToDoName = value.slice(0,maxInput)   
        })
        setTimeout(() => input.focus(),0)
        return input
    }

    // button
    const renderNewTaskButton = function() {
        const button = document.createElement('button')
        button.classList.add('task-form__button')
        button.textContent = 'ADD TASK'
        return button
    }

    // form
    const renderNewTaskForm = function() {
        const container = document.createElement('form')
        container.classList.add('task-form')

        const renderInput = renderNewTaskInput()
        const renderButton = renderNewTaskButton()

        container.addEventListener('submit', function(event) {
            event.preventDefault()

            if(newToDoName.length === 0) {
                renderInput.classList.add('input-error')
                return
            } else {
                renderInput.classList.remove('input-error')
            }

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

    // List of tasks
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
        button.classList.add('task__button--button')
        button.addEventListener('click', function() {
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
        wrapper.classList.add('task__wrapper')
        return wrapper
    }

    const renderTask = function(task) {
        const container = document.createElement('li')
        container.className = 'task__element'

        const renderElementName = renderTaskName()
        renderElementName.textContent = task.name

        renderElementName.classList.add('task__wrapper--name')
        if(task.isCompleted) {
            renderElementName.classList.add('task__completed')
        }
        renderElementName.addEventListener('click', function() {
            task.isCompleted = !task.isCompleted
            update()
        })

        const elementButtonDelete = renderButtonDelete(task.id)
        
        const wrapperElement = renderTaskWrapper()
        wrapperElement.appendChild(renderElementName)
        wrapperElement.appendChild(elementButtonDelete)
        
        container.appendChild(wrapperElement)
        return container  
    }

    const renderTaskList = function(tasks) {
        const container = document.createElement('ol')
        container.className='task'
        const tasksElements = tasks.map(task => {
            return renderTask(task)
        })
        appendArray(tasksElements, container)

        return container     
    }

    // render
    const render = function() {
        const container = document.createElement('div')
        container.classList.add('app')
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
        saveLocalStorage()
    }

    const saveLocalStorage = function() {
        const state = {
            tasks: tasks,
            newToDoName: newToDoName
        }
        localStorage.setItem(AppKey, JSON.stringify(state))
    }

    const loadLocalStorage = function() {
        let state = localStorage.getItem(AppKey)
        if(!state) return
        state = JSON.parse(state)
        tasks = state.tasks
        newToDoName = state.newToDoName
    }

    const init = function(selector, key) {
        const container = document.querySelector(selector)
        mainContainer = container
        if(!mainContainer) return console.log('Selector not exists')

        AppKey = key
        loadLocalStorage()

        const app = render()
        mainContainer.appendChild(app)
        return mainContainer
    }

    return init
}
















