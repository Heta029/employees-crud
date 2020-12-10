import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./reducer/login.reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  login: loginReducer
});
const middleWare = [logger, thunk];
export const store = createStore(rootReducer, applyMiddleware(...middleWare));
