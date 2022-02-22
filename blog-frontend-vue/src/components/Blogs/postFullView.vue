<script>
export default{
    name: 'post',
    props:['title', 'body_raw','author','publish_date', 'id'],
    computed:{
        body(){
            const re = /(http(s)?:\/\/www.youtube.com\/watch\?(\S)*)/;
            return this.body_raw.replace(re,'<br><iframe width="560" height="315" src="$1"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>' )
        }
    },
    methods:{
        async onMount(){
            const re = /(http(s)?:\/\/www.youtube.com\/watch\?(\S)*)/;
            this.body = this.body_raw.replace(re,'<br><iframe width="560" height="315" src="$1"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>' )
        }
    }
}
</script>
<!-- (http(s)?:\/\/www.youtube.com\/watch\?(\S)*) -->
<template>
    <div class="container">
                <h1>{{title}}</h1>
                <p v-html="body"></p>
                <p class="small">{{publish_date}}  <router-link :to="{name: 'authorBlog', query:{ 'author':author}}">{{author}}</router-link></p>
            </div>
</template>