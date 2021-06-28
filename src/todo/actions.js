import { ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, UPDATE_TODO, FILTER_TODOS, SEARCH_TODOS } from './types'

export function addTodo(description) {
  return {
    type: ADD_TODO,
    payload: description
  }
}

export function deleteTodo(id) {
  return function (dispatch) {
    dispatch({
      type: DELETE_TODO,
      payload: id
    })
    setTimeout(() => {
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: id
      })
    }, 500);
  }
}

export function updateTodo(id, data) {
  return {
    type: UPDATE_TODO,
    payload: { id, data }
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