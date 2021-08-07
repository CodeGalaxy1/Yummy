import { USER_STATE_CHANGE, CLEAR_DATA } from "../constants/index";

//AsyncStorage plugin
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkResponse = async () => {
    let response = await AsyncStorage.getItem('currentUser')
    let user = await JSON.parse(response)
    return user;
}

//Asynchronous "actions"

export function clearData() {
    return (async (dispatch) => {
        await dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return (async (dispatch) => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        }).then(res => {
            console.log('res.status', res.status);
            return res.json()
        }).then( async (result) => {    
            if (result) {
                let user = await checkResponse();
                user = result.find((u) => u.token === user.token)
                dispatch
                ({
                    type: USER_STATE_CHANGE,
                    currentUser: user
                })
            } else {
                console.log('does not exist')
            }
        })
    })
}