import { ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, UPDATE_TODO, FILTER_TODOS, SEARCH_TODOS } from './types'


function Task(description) {
  this.id = '_' + Math.random().toString(36).substring(2, 9)
  this.description = description
  this.completed = false
  this.important = false
  this.delitionIsLoading = false
}


let initialState = {
  searchValue: null,
  tasks: [
    new Task("Drink Coffee"),
    new Task("Learn Redux"),
    new Task("Make Awesome App"),
  ],
  filter: 'all',
}

if (localStorage.tasks) initialState.tasks = JSON.parse(localStorage.getItem('tasks'))


export function todosReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          new Task(payload),
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(task => {
            if (task.id === payload) {
              task.delitionIsLoading = true
            }
            return task
          })
        ]
      }

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        tasks: [
          ...state.tasks.filter(task => task.id !== payload)
        ]
      }

    case UPDATE_TODO:
      const { id, data } = payload

      return {
        ...state,
        tasks: [
          ...state.tasks.map(task => {
            if (task.id === id) {
              return {
                ...task,
                ...data
              }
            }
            return task
          })
        ]
      }

    case FILTER_TODOS:
      return {
        ...state,
        filter: payload
      }

    case SEARCH_TODOS:
      return {
        ...state,
        searchValue: payload
      }

    default:
      return state
  }
}