import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

// combineReducers을 통해서 각각의 리듀서를 합침
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
