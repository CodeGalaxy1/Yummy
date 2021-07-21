import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STATE_CHANGE , USER_POSTS_STATE_CHANGE} from "../constants/index";

const checkResponse = async () => {
    let response = await AsyncStorage.getItem('currentUser')
    let user = await JSON.parse(response)
    return user;
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

export function fetchRecipe() {
    return (async (dispatch) => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/recipes', {
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
                result.To
                dispatch
                ({
                    type: USER_POSTS_STATE_CHANGE,
                    recipes: result
                })
            } else {
                console.log('error')
            }
        })
    })
}