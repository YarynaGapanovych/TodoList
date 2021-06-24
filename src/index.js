import './css/reset.css'
import './css/styles.css'
import { store } from './store/store'
import { addTodo, deleteTodo, updateTodo, filter, searchTodos } from './redux/actions'

const allBtn = document.querySelector('#all-btn')
const completedBtn = document.querySelector('#completed-btn')
const undoneBtn = document.querySelector('#undone-btn')

const todoList = document.querySelector('.todo-list')
const addInput = document.querySelector('#add-input')
const searchInput = document.querySelector('#search-input')

const addBtn = document.querySelector('#add-btn')

window.store = store


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

  if (todo.delitionIsLoading) {
    todoListItem.classList.add('delition')
  }

  // delete todo
  trashBtn.addEventListener('click', () => {
    store.dispatch(deleteTodo(todo.id))
  })

  // done todo
  todoItemDesc.addEventListener('click', () => {
    const type = 'completed';
    const value = !todo.completed;
    store.dispatch(updateTodo(todo.id, type, value));
  })

  // important todo
  importantBtn.addEventListener('click', () => {
    const type = 'important';
    const value = !todo.important;
    store.dispatch(updateTodo(todo.id, type, value));
  })

  return todoListItem
}

const handlerSetFilterBtnActive = () => {
  const { filter } = store.getState();

  if (filter === 'all') {
    allBtn.classList.add('active');
    completedBtn.classList.remove('active');
    undoneBtn.classList.remove('active');
  }
  if (filter === 'completed') {
    completedBtn.classList.add('active');
    allBtn.classList.remove('active');
    undoneBtn.classList.remove('active');
  }
  if (filter === 'undone') {
    undoneBtn.classList.add('active');
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
  }
}


const render = () => {
  todoList.innerHTML = ''

  const { tasks, filter, searchValue } = store.getState();

  let filteredTasks;

  if (filter === 'all') {
    filteredTasks = tasks
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed)
  }

  if (filter === 'undone') {
    filteredTasks = tasks.filter(task => !task.completed)
  }

  if (searchValue) {
    filteredTasks = filteredTasks.filter(task => task.description.toLowerCase().includes(searchValue.toLowerCase()))
  }

  handlerSetFilterBtnActive();

  if (tasks.length > 0) {
    filteredTasks.forEach((task) => {
      const taskItem = createtodoListItem(task);
      todoList.append(taskItem);
    });
  }
}

render()

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(store.getState().tasks))
}


// add todo
addBtn.addEventListener('click', () => {
  if (addInput.value.trim() === '') return;
  store.dispatch(addTodo(addInput.value.trim()));
  addInput.value = '';
})


// filtration btns
allBtn.addEventListener('click', () => {
  const filterType = 'all';
  store.dispatch(filter(filterType));
})

completedBtn.addEventListener('click', () => {
  const filterType = 'completed';
  store.dispatch(filter(filterType));
})

undoneBtn.addEventListener('click', () => {
  const filterType = 'undone';
  store.dispatch(filter(filterType));
})

// search 
searchInput.addEventListener('input', (e) => {
  const { value } = e.target;
  const searchValue = value.trim();

  store.dispatch(searchTodos(searchValue));
})


store.subscribe(() => {
  render();
  saveTasksToLocalStorage();
})


