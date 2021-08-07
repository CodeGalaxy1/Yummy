import { USER_STATE_CHANGE, CLEAR_DATA } from "../constants";

const initialState = {
    currentUser: '',
}

/*
user is a reducer(first argument, second argument),
first - state argument,
second - action argument,
Returns the next "state".
*/

//In the initial run "state" = "undefined"!
//But if it is not undefined he will get the "initialState".
export const user = (state = initialState, action) => {

    //(string)action.type - type "action" entered now
    switch (action.type) {
        case USER_STATE_CHANGE:

            //state['user'] = action.payload //Wrong, The "state" in "Redux" cannot be changed!
            //{ ...state, currentUser: action.currentUser } - {Duplicate "state", override to key: action.payload(new user)}
            return { ...state, currentUser: action.currentUser }

        case CLEAR_DATA:
            return { currentUser: null }
            
        default:
            return state;
    }
}