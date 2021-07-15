export const fetchUser = () => {
    return async (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        }

        await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/users' , options).then(function (response) {
            return response.json();
        }).then((result) => {
            const user = (result.find((user) => user.id === 1));

            console.log(JSON.stringify(user));

            if (user) {
                dispatch({ type: 'USER_STATE_CHANGE', currentUser: user})
            } else {
                console.log('does not exist')
            }

        });
    }
}