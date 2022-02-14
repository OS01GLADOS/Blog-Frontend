<script>
export default{
    name: 'post',
    props:['title', 'body','author','publish_date', 'id']
}
</script>

<template>
    <div class="container">
                <h1>{{title}}</h1>
                <p>{{body}}</p>
                <p class="small">{{publish_date}}  <a href="#">{{author}}</a></p>
            </div>
</template>