// import { authHeader } from '../_helpers';
import {configs } from '../config'

export const userService = {
    login,
    logout,
    getAll
}

function login(userid, password) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userid, password })
    };

    const authUrl = configs.apiUrl + '/users/authenticate'
    return fetch(authUrl, requestOption)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if(user.Token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshs
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getAll() {
    const requestOption = {
        method: 'GET',
        mode: 'cors'
        // headers: authHeader()
    };
    
    var url = configs.apiUrl + '/users';
    return fetch(url, requestOption).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        console.log(data);
        if(!response.ok) {
            if(response.stat == 401) {
                console.log('not found')
                // logout();
                // location.reload(true)
            }
        
            const error = (data && data.message ) || response.statusText;
            return Promise.reject(error)
        }

        return data;

       
    })
}