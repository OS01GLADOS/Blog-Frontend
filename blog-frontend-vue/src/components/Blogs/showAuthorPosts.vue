<script>
import showBlogsVue from "./showBlogs.vue";

export default{
    name: 'authorBlogs',
    components: {showBlogsVue}
}
</script>

<template>
    <h1>Blogs by {{$route.query.author}}</h1>
    <showBlogsVue></showBlogsVue>
</template>