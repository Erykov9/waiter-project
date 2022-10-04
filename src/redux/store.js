import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import initialState from "./initialState";
import optionsReducer from "./optionsRedux";
import tablesReducer from "./tablesRedux";
import thunk from "redux-thunk";

const subreducers = {
  tables: tablesReducer,
  options: optionsReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;