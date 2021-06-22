import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, DONE_TODO, IMPORTANT_TODO, FILTER_TODOS, SEARCH_TODOS } from './types'


let initialState = {
  searchValue: null,
  tasks: [
    { id: '_' + Math.random().toString(36).substring(2, 9), description: "Drink Coffee", completed: true, important: false, delitionIsLoading: false },
    { id: '_' + Math.random().toString(36).substring(2, 9), description: "Learn Redux", completed: false, important: true, delitionIsLoading: false },
    { id: '_' + Math.random().toString(36).substring(2, 9), description: "Make Awesome App", completed: false, important: false, delitionIsLoading: false }
  ],
  filter: 'all',
}

!localStorage.tasks
  ? initialState.tasks
  : initialState.tasks = JSON.parse(localStorage.getItem('tasks'))


function todosReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: '_' + Math.random().toString(36).substring(2, 9), description: `${payload}`, completed: false, important: false, delitionIsLoading: false },
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

    case DONE_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(task => {
            if (task.id === payload.id) {
              task.completed = payload.completed
            }
            return task
          })
        ]
      }

    case IMPORTANT_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(task => {
            if (task.id === payload.id) {
              task.important = payload.important
            }
            return task
          })
        ]
      }
    default:
      return state
  }
}

function filterReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case FILTER_TODOS:
      return {
        ...state,
        tasks: [
          ...state.tasks
        ],
        filter: payload
      }

    case SEARCH_TODOS:
      return {
        ...state,
        tasks: [
          ...state.tasks
        ],
        searchValue: payload
      }

    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
})
