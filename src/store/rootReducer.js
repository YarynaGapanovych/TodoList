import { combineReducers } from "redux"
import { todosReducer } from "../todo/todosReducer"

export const rootReducer = combineReducers({
  todos: todosReducer
})