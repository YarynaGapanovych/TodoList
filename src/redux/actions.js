import { ADD_TODO, DELETE_TODO, DONE_TODO, IMPORTANT_TODO, FILTER_TODOS, SEARCH_TODOS } from './types'

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

export function filter(type) {
  return {
    type: FILTER_TODOS,
    payload: type
  }
}

export function searchTodos(searchValue) {
  return {
    type: SEARCH_TODOS,
    payload: searchValue
  }
}