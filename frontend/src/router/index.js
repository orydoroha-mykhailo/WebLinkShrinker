import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/ProfileView'
import AboutView from '../views/AboutView'
import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import MainView from "@/views/MainView";
import UpdateUrlView from "@/views/UpdateUrlView";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainView,
    },
    {
        path: '/update-url/:id',
        name: 'UpdateUrl',
        component: UpdateUrlView,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: RegistrationView,
    },
    {
        path: '/registration2',
        name: 'Registration2',
        component: RegistrationView,
    },
    {
        path: '/main',
        name: 'Main',
        component: MainView,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router