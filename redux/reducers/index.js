//Redux library
import { combineReducers } from "redux";

import { user } from "./user";

/*
combineReducers - Allows you to divide the "state" into parts.
combineReducers - Consolidates several "reducers" into one "Reducer"
The keys of the object are the names of the parts for example (userState).
*/
const Reducers = combineReducers({
    userState: user
})

export default Reducers;