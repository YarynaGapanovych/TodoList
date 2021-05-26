import { ADD_TODO, DELETE_TODO, DONE_TODO, IMPORTANT_TODO, ALL_TODOS, COMPLETED_TODOS, UNDONE_TODOS, SEARCH_TODOS } from './types'

export function addTodo(description) {
  return {
    type: ADD_TODO,
    payload: `${description}`
  }
}

export function deleteTodo(index) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({
        type: DELETE_TODO,
        payload: index
      })
    }, 500);

  }
}

export function doneTodo(index) {
  return {
    type: DONE_TODO,
    payload: index
  }
}

export function importantTodo(index) {
  return {
    type: IMPORTANT_TODO,
    payload: index
  }
}

export function allTodos() {
  return {
    type: ALL_TODOS,
  }
}

export function completedTodos(completedArr) {
  return {
    type: COMPLETED_TODOS,
    payload: completedArr
  }
}

export function undoneTodos(undoneArr) {
  return {
    type: UNDONE_TODOS,
    payload: undoneArr
  }
}

export function searchTodos(searchArr) {
  return {
    type: SEARCH_TODOS,
    payload: searchArr
  }
}