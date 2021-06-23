import { ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, UPDATE_TODO, FILTER_TODOS, SEARCH_TODOS } from './types'

export function addTodo(description) {
  return {
    type: ADD_TODO,
    payload: description
  }
}

export function deleteTodo(id) {
  store.dispatch(deleteTodoSuccess(id))
  return {
    type: DELETE_TODO,
    payload: id
  }
}

export function deleteTodoSuccess(id) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: id
      })
    }, 500);
  }
}

export function updateTodo(id, type, value) {
  return {
    type: UPDATE_TODO,
    payload: { id, type, value }
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