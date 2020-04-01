import { userService } from '../_services';
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user 
    ? { status: {loggedIn: true}, user}
    : { status: {}, user: null};

export const authentication = {
    namespaced: true,
    state: initialState,
    mutations: {
        loginRequest(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true }
            state.user = user;
        },
        loginFailure(state) {
            state.staus = {};
            state.user = null;
        },
        logout(state) {
            state.status = {}
            state.user = null;
        }
    },
    actions: {
        login({ dispatch, commit }, { userid, password }) {
            commit('loginRequest', { userid });

            userService.login(userid, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true});
                    }
                )
        },
        logout( {commit}){
            userService.logout();
            commit('logout');
            router.push('/login')
        }
    }
}