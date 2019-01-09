import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { fetchCircuits, fetchGreetings } from "./api";

export const initializeSession = () => ({
    type: "INITIALIZE_SESSION",
});

const storeData = (data) => ({
    type: "STORE_DATA",
    data,
});

const storeGreetings= (data) => ({
    type: "STORE_GREETINGS",
    data,
});

export const fetchData = () => (dispatch) => fetchCircuits().then(res => dispatch(storeData(res)));
export const fetchGreetingsData = () => (dispatch) => fetchGreetings().then(res => dispatch(storeGreetings(res)));

const sessionReducer = (state = false, action) => {
    switch (action.type) {
        case "INITIALIZE_SESSION":
            return true;
        default: 
            return state;
    }
};

const dataReducer = (state = [], action) => {
    switch (action.type) {
        case "STORE_DATA":
            return action.data;
        default: 
            return state;
    }
};

const greetingsReducer = (state = [], action) => {
    switch (action.type) {
        case "STORE_GREETINGS":
            return action.data;
        default: 
            return state;
    }
};

const reducer = combineReducers({
    loggedIn: sessionReducer,
    data: dataReducer,
    greetings: greetingsReducer,
});

export default (initialState) => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
