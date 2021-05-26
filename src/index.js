import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/rootReducer'
import { addTodo, deleteTodo, doneTodo, importantTodo, allTodos, completedTodos, undoneTodos, searchTodos } from './redux/actions'
import './css/reset.css'
import './css/styles.css'

const allBtn = document.querySelector('#all-btn')
const completedBtn = document.querySelector('#completed-btn')
const undoneBtn = document.querySelector('#undone-btn')

const todoList = document.querySelector('.todo-list')
const addInput = document.querySelector('#add-input')
const searchInput = document.querySelector('#search-input')

const addBtn = document.querySelector('#add-btn')
let trashBtns = document.querySelectorAll('.trash-btn')
let importantBtns = document.querySelectorAll('.important-btn')

// 
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


allBtn.classList.add('active')
let todoItemElems = []


const createTemplate = (task, index) => {
  return `<li class="todo-list-item">
  <span class="todo - list - item - label 
  ${task.completed ? 'done' : ''}
  ${task.important ? 'important' : ''}">${task.description}</span>
  <div class="todo-list-btns" >
  <button type="button" class="btn important-btn">
    <i class="fa fa-exclamation"></i>
  </button>
  <button type="button" class="btn trash-btn">
    <i class="fa fa-trash-o"></i>
  </button>
</ div> 
</li>`
}

const fillHtmlList = () => {
  todoList.innerHTML = ''
  if (store.getState().todos.tasks.length > 0) {
    // filterTasks()
    if (completedBtn.classList.contains('active')) {
      store.getState().todos.completed.forEach((item, index) => {
        todoList.innerHTML += createTemplate(item, index)
      });
    } else if (undoneBtn.classList.contains('active')) {
      store.getState().todos.undone.forEach((item, index) => {
        todoList.innerHTML += createTemplate(item, index)
      });
    } else if (searchInput === document.activeElement) {
      store.getState().todos.search.forEach((item, index) => {
        todoList.innerHTML += createTemplate(item, index)
      });
    } else {
      store.getState().todos.tasks.forEach((item, index) => {
        todoList.innerHTML += createTemplate(item, index)
      });
    }


    // done todo
    todoItemElems = document.querySelectorAll('.todo-list-item')
    todoItemElems.forEach((elem, index) => {
      elem.firstElementChild.addEventListener('click', () => {
        store.dispatch(doneTodo(index))
      })
    });

    // important todo
    importantBtns = document.querySelectorAll('.important-btn')
    importantBtns.forEach((important, index) => {
      important.addEventListener('click', () => {
        store.dispatch(importantTodo(index))
      })
    });

    // delete todo
    trashBtns = document.querySelectorAll('.trash-btn')
    trashBtns.forEach((trash, index) => {
      trash.addEventListener('click', () => {
        todoItemElems[index].classList.add('delition')
        store.dispatch(deleteTodo(index))
      })
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
  if (addInput.value === '') return
  store.dispatch(addTodo(addInput.value))
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
  store.getState().todos.tasks.forEach((item, index) => {
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
  store.getState().todos.tasks.forEach((item, index) => {
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

  store.getState().todos.tasks.forEach((item, index) => {
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


