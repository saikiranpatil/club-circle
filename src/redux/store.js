import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { allUsersReducer, userReducer } from '../redux/reducers/userReducers'
import { allTasksReducer, singleTaskReducer } from "./reducers/taskReducers";
import { allClubsReducer, setRoleReducer, singleClubReducer } from "./reducers/clubReducers";
import { allSubtasksReducer, singleSubtaskReducer } from "./reducers/subTaskReducers";

const reducer = combineReducers({
    user: userReducer,
    users: allUsersReducer,
    club: singleClubReducer,
    clubs: allClubsReducer,
    task: singleTaskReducer,
    tasks: allTasksReducer,
    subtask: singleSubtaskReducer,
    subtasks: allSubtasksReducer,
    setRole: setRoleReducer
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;