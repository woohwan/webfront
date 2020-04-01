import Vue from 'vue'
import Vuex from 'vuex'

import { users } from './users.module';
import { alert } from './alert.module';
import { authentication } from './authentication.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    users,
    alert,
    authentication
  }
});
