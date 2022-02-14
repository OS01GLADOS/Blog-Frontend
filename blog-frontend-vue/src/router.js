import { createWebHistory, createRouter } from 'vue-router'
import loginVue from './components/Authentification/login.vue';
import registrationVue from './components/Authentification/registration.vue';
import showBlogsVue from './components/Blogs/showBlogs.vue'
import showOneBlogVue from './components/Blogs/showOneBlog.vue';

const routes = [
    { path: '/', name: 'Home', component: showBlogsVue },
    { path: '/login', name: 'login', component: loginVue },
    { path: '/register', name: 'register', component: registrationVue },
    { path: '/blog/:id', name: 'showBlog', component: showOneBlogVue}
];

const router = createRouter({ history: createWebHistory(), routes });
export default router