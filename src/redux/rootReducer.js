import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, DONE_TODO, IMPORTANT_TODO, ALL_TODOS, COMPLETED_TODOS, UNDONE_TODOS, SEARCH_TODOS } from './types'


let initialState = {
  tasks: [
    { description: "Drink Coffee", completed: true, important: false },
    { description: "Learn Redux", completed: false, important: true },
    { description: "Make Awesome App", completed: false, important: false }
  ]
}

!localStorage.tasks
  ? initialState.tasks
  : initialState.tasks = JSON.parse(localStorage.getItem('tasks'))


function todos(state = initialState, action) {
  switch (action.type) {

    case ADD_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { description: `${action.payload}`, completed: false, important: false },
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, action.payload), ...state.tasks.slice(action.payload + 1)
        ]
      }

    case DONE_TODO:
      state.tasks[action.payload].completed = !state.tasks[action.payload].completed
      return {
        ...state,
        tasks: [
          ...state.tasks,
        ]
      }

    case IMPORTANT_TODO:
      state.tasks[action.payload].important = !state.tasks[action.payload].important
      return {
        ...state,
        tasks: [
          ...state.tasks,
        ]
      }

    case ALL_TODOS:
      return state

    case COMPLETED_TODOS:
      return {
        ...state,
        tasks: [
          ...state.tasks,
        ],
        completed: [
          ...action.payload
        ]
      }

    case UNDONE_TODOS:
      return {
        ...state,
        tasks: [
          ...state.tasks,
        ],
        undone: [
          ...action.payload
        ]
      }

    case SEARCH_TODOS:
      return {
        ...state,
        tasks: [
          ...state.tasks,
        ],
        search: [
          ...action.payload
        ]
      }

    default:
      return state
  }
}


export const rootReducer = combineReducers({
  todos
})
