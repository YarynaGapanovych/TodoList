import './css/reset.css'
import './css/styles.css'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/rootReducer'
import { addTodo, deleteTodo, doneTodo, importantTodo, allTodos, completedTodos, undoneTodos, searchTodos } from './redux/actions'

const allBtn = document.querySelector('#all-btn')
const completedBtn = document.querySelector('#completed-btn')
const undoneBtn = document.querySelector('#undone-btn')

const todoList = document.querySelector('.todo-list')
const addInput = document.querySelector('#add-input')
const searchInput = document.querySelector('#search-input')

const addBtn = document.querySelector('#add-btn')
let trashBtns
let importantBtns


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

window.store = store

allBtn.classList.add('active')

const createtodoListItem = (todo) => {
  const todoListItem = document.createElement('li')
  const todoItemDesc = document.createElement('span')
  const todoBtns = document.createElement('div')
  const importantBtn = document.createElement('button')
  const trashBtn = document.createElement('button')

  todoItemDesc.textContent = `${todo.description}`

  todoListItem.classList.add('todo-list-item')
  todoItemDesc.classList.add('todo-list-item-label')
  todoBtns.classList.add('todo-list-btns')
  importantBtn.classList.add('btn', 'important-btn')
  trashBtn.classList.add('btn', 'trash-btn')

  todoListItem.appendChild(todoItemDesc)
  todoListItem.appendChild(todoBtns)
  todoBtns.appendChild(importantBtn)
  todoBtns.appendChild(trashBtn)

  importantBtn.innerHTML = `<i class="fa fa-exclamation"></i>`
  trashBtn.innerHTML = `<i class="fa fa-trash-o"></i>`

  if (todo.completed) {
    todoItemDesc.classList.add('done')
  }

  if (todo.important) {
    todoItemDesc.classList.add('important')
  }

  // delete todo
  trashBtn.addEventListener('click', () => {
    todoListItem.classList.add('delition')
    store.dispatch(deleteTodo(todo.id))
  })

  // done todo
  todoItemDesc.addEventListener('click', () => {
    const completed = !todo.completed
    store.dispatch(doneTodo(todo.id, completed))
  })

  // important todo
  importantBtn.addEventListener('click', () => {
    const important = !todo.important
    store.dispatch(importantTodo(todo.id, important))
  })


  return todoListItem
}


const fillHtmlList = () => {
  todoList.innerHTML = ''

  let tasks = store.getState().todos.tasks
  if (tasks.length > 0) {
    const allTasks = tasks.forEach((item) => {
      const taskItem = createtodoListItem(item)
      todoList.append(taskItem)
    });
  }
}

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(store.getState().todos.tasks))
}




// add todo
addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (addInput.value.trim() === '') return
  store.dispatch(addTodo(addInput.value.trim()))
  addInput.value = ''
})

// all todos
allBtn.addEventListener('click', () => {
  allBtn.classList.add('active')
  completedBtn.classList.remove('active')
  undoneBtn.classList.remove('active')

  store.dispatch(allTodos())
})

// completed todos
completedBtn.addEventListener('click', () => {
  completedBtn.classList.add('active')
  allBtn.classList.remove('active')
  undoneBtn.classList.remove('active')

  let completedArr = []
  store.getState().todos.tasks.forEach((item) => {
    if (item.completed) {
      completedArr.push(item)
    }
  });

  store.dispatch(completedTodos(completedArr))
})

// undone todos
undoneBtn.addEventListener('click', () => {
  undoneBtn.classList.add('active')
  allBtn.classList.remove('active')
  completedBtn.classList.remove('active')

  let undoneArr = []
  store.getState().todos.tasks.forEach((item) => {
    if (!item.completed) {
      undoneArr.push(item)
    }
  });

  store.dispatch(undoneTodos(undoneArr))
})

// search 
searchInput.addEventListener('keyup', (e) => {
  const searchText = e.target.value.toLowerCase()
  let searchArr = []

  store.getState().todos.tasks.forEach((item) => {
    if (item.description.toLowerCase().indexOf(searchText) != -1) {
      searchArr.push(item)
    }
  });

  store.dispatch(searchTodos(searchArr))
})


searchInput.onblur = () => {
  searchInput.value = ''
  allBtn.classList.add('active')
  store.dispatch(allTodos())
}

store.subscribe(() => {
  const state = store.getState()

  updateLocal()
  fillHtmlList()
})


