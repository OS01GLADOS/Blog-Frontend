import { createWebHistory, createRouter } from 'vue-router'
import loginVue from './components/Authentification/login.vue';
import registrationVue from './components/Authentification/registration.vue';
import showBlogsVue from './components/Blogs/showBlogs.vue'
import showOneBlogVue from './components/Blogs/showOneBlog.vue';
import profileVue from './components/Authentification/profile.vue';

const routes = [
    { path: '/', name: 'Home', component: showBlogsVue},
    { path: '/login', name: 'login', component: loginVue },
    { path: '/register', name: 'register', component: registrationVue },
    { path: '/blog/:id', name: 'showBlog', component: showOneBlogVue},
    { path: '/profile/', name: 'userProfile', component:profileVue},
];

const router = createRouter({ history: createWebHistory(), routes });
export default router