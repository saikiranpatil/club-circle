import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { allTasksReducer, singleTaskReducer } from "./reducers/taskReducer";
import { allClubsReducer, setRoleReducer, singleClubReducer } from "./reducers/clubReducer";
import { allSubtasksReducer, singleSubtaskReducer } from "./reducers/subTaskReducer";

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,
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