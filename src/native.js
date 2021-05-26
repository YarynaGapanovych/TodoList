import './css/reset.css'
import './css/styles.css'

const todoList = document.querySelector('.todo-list')

const allBtn = document.querySelector('#all-btn')
const completedBtn = document.querySelector('#completed-btn')
const undoneBtn = document.querySelector('#undone-btn')

const searchInput = document.querySelector('#search-input')

const trashBtns = document.querySelectorAll('.trash-btn')

const addInput = document.querySelector('#add-input')
const addBtn = document.querySelector('#add-btn')

// 
let tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElems = []

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `<li class="todo-list-item">
  <span onclick="completeTask(${index})" class="todo - list - item - label ${task.completed ? 'done' : ''}">${task.description}</span>
  <div class="todo-list-btns" >
  <button type="button" class="btn">
    <i class="fa fa-exclamation"></i>
  </button>
  <button onclick="deleteTask(${index})" type="button" class="btn trash-btn">
    <i class="fa fa-trash-o"></i>
  </button>
</ div> 
</li>`
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false)
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true)
  tasks = [...activeTasks, ...completedTasks]

}

const fillHtmlList = () => {
  todoList.innerHTML = ''
  if (tasks.length > 0) {
    filterTasks()
    tasks.forEach((item, index) => {
      todoList.innerHTML += createTemplate(item, index)
    });
    todoItemElems = document.querySelectorAll('.todo-list-item')
  }
}

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed
  todoItemElems[index].classList.toggle('done')
  updateLocal()
  fillHtmlList()
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (addInput.value === '') return
  tasks.push(new Task(addInput.value))
  updateLocal()
  fillHtmlList()
  addInput.value = ''
})

const deleteTask = index => {
  todoItemElems[index].classList.add('delition')
  setTimeout(() => {
    tasks.splice(index, 1)
    updateLocal()
    fillHtmlList()
  }, 500);
}

// filter
allBtn.addEventListener('click', () => {
  todoList.innerHTML = ''
  if (tasks.length > 0) {
    filterTasks()
    tasks.forEach((item, index) => {
      todoList.innerHTML += createTemplate(item, index)
    });
    todoItemElems = document.querySelectorAll('.todo-list-item')
  }
})

completedBtn.addEventListener('click', () => {
  // completedBtn.focus()
  todoList.innerHTML = ''
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      if (item.completed == true) {
        todoList.innerHTML += createTemplate(item, index)
      }
    });
    todoItemElems = document.querySelectorAll('.todo-list-item')
  }
})

undoneBtn.addEventListener('click', () => {
  todoList.innerHTML = ''
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      if (item.completed == false) {
        todoList.innerHTML += createTemplate(item, index)
      }
    });
    todoItemElems = document.querySelectorAll('.todo-list-item')
  }
})


searchInput.addEventListener('keyup', (e) => {
  // console.log(e)
  const searchText = e.target.value.toLowerCase()
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      if (item.description.toLowerCase().indexOf(searchText) != -1) {
        todoList.innerHTML += createTemplate(item, index)
      }
    });
    todoItemElems = document.querySelectorAll('.todo-list-item')
  }
})
