import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, DONE_TODO, IMPORTANT_TODO, ALL_TODOS, COMPLETED_TODOS, UNDONE_TODOS, SEARCH_TODOS } from './types'


let initialState = {
  searchValue: null,
  tasks: [
    { id: '_' + Math.random().toString(36).substr(2, 9), description: "Drink Coffee", completed: true, important: false },
    { id: '_' + Math.random().toString(36).substr(2, 9), description: "Learn Redux", completed: false, important: true },
    { id: '_' + Math.random().toString(36).substr(2, 9), description: "Make Awesome App", completed: false, important: false }
  ],
  allBtn: { active: true },
  completedBtn: { active: false },
  undoneBtn: { active: false },

}

!localStorage.tasks
  ? initialState.tasks
  : initialState.tasks = JSON.parse(localStorage.getItem('tasks'))


function todos(state = initialState, action) {
  const { type, payload } = action


  switch (type) {

    case ADD_TODO:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: '_' + Math.random().toString(36).substr(2, 9), description: `${payload}`, completed: false, important: false },
        ]
      }

    case DELETE_TODO:
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

    case ALL_TODOS:
      return {
        ...state,
        allBtn: { active: true },
        completedBtn: { active: false },
        undoneBtn: { active: false }
      }

    case COMPLETED_TODOS:
      return {
        ...state,
        allBtn: { active: false },
        completedBtn: { active: true },
        undoneBtn: { active: false }
      }

    case UNDONE_TODOS:
      return {
        ...state,
        allBtn: { active: false },
        completed: { active: false },
        undoneBtn: { active: true }
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


export const rootReducer = combineReducers({
  todos
})
