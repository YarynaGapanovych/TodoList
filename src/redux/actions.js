import { ADD_TODO, DELETE_TODO, DONE_TODO, IMPORTANT_TODO, ALL_TODOS, COMPLETED_TODOS, UNDONE_TODOS, SEARCH_TODOS } from './types'

export function addTodo(description) {
  return {
    type: ADD_TODO,
    payload: `${description}`
  }
}

export function deleteTodo(id) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({
        type: DELETE_TODO,
        payload: id
      })
    }, 500);

  }
}

export function doneTodo(id, completed) {
  return {
    type: DONE_TODO,
    payload: { id, completed }
  }
}

export function importantTodo(id, important) {
  return {
    type: IMPORTANT_TODO,
    payload: { id, important }
  }
}

export function allTodos() {
  return {
    type: ALL_TODOS,
  }
}

export function completedTodos() {
  return {
    type: COMPLETED_TODOS
  }
}

export function undoneTodos() {
  return {
    type: UNDONE_TODOS
  }
}

export function searchTodos(searchValue) {
  return {
    type: SEARCH_TODOS,
    payload: searchValue
  }
}