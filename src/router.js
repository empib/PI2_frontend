import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Data from "./components/Data.vue";
import Register from "./components/Register.vue";

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "Login", component: Login },
    { path: '/data', name: "Data", component: Data, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
            next();
        } else {
            next('login');
        }
        }},
    { path: '/register', name: "Register", component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;