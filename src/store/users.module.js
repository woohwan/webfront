import { userService } from '../_services'

export const users = {
    namespaced: true,
    state: {
        all: {},
        ulist: []
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true};
        },
        getAllSuccess(state, users) {
            state.all = { items: users};
            state.ulist = users;
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    },
    actions: {
        getAll( { commit }) {
            console.log("getAll method in store");
            commit('getAllRequest');

            userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            )

        }
    }

}