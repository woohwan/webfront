<template>
<div>
    <v-container >
        <v-row >   
            <v-col class="ma-3 pa-3">     
                <v-toolbar  dense>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                    <v-toolbar-title>Title</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="logout">
                        <i class="fas fa-sign-out-alt" style="font-size:16px;"></i>
                    </v-btn>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row class="ma-0 mp-0" >
            <v-col>
                <v-btn @click="getAll" green--text >getAll test</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col  >
                <v-data-table
                    :headers="headers"
                    :items="ulist"
                    :loading="loading"
                    class="elevation-1"
                >
                    <template #item.company="{item}">
                        {{ item.company }}
                    </template>
                </v-data-table>
            </v-col>
        </v-row> 
    </v-container>
</div>
</template>

<script>
export default {
    // computed: {
    //     user() {
    //         return this.$store.state.authentication.user;
    //     },
    //     users() {
    //         return this.$store.state.users.all;
    //     }
    // },
    // created() {
    //     this.$store.dispatch('users/getAll');
    // },
    data() {
        return {
            // users: [],
            headers: [
                { text: '사용자ID' , value: "id", sortable:false },
                { text: '이름' , value: "username", sortable:true },
                { text: '회사' , value: "company", sortable:true },
                { text: '부서' , value: "depName", sortable:false },
            ],
            loading: false
        }
    },
    computed: {
        users() {
            return this.$store.state.users.all;
        },
        ulist() {
            return this.$store.state.users.ulist;
        }
    },
    methods: {
        getAll() {
            this.$store.dispatch('users/getAll');
        },
        logout() {
            this.$store.dispatch('authentication/logout');
        }
    }
}
</script>
<style scoped>

</style>