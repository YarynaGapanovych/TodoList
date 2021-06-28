import { combineReducers } from "redux"
import { todosReducer } from "../redux/todosReducer"

export const rootReducer = combineReducers({
  todos: todosReducer
})
