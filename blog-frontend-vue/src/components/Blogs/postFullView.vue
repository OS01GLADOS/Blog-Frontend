<script>

export default{
    name: 'post',
    props:['title', 'body','author','publish_date', 'id'],
    
    data(){
        return{
            data_content: ''
        }
    },
    mounted(){
            const requestOptions = {
                method: "GET",
            }
            fetch("http://blog:8000/api/posts/"+ this.$route.params.id, requestOptions)
                .then(async response => {
                    const data = await response.json()
                    if (!response.ok){
                            const error = (data && data.message) || response.status
                            return Promise.reject(error)
                        }
                    this.data_content = data.content
                    return data.author_id
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
    },
    computed:{
        styled_body:{
                get(){
                    const re = /https?:\/\/www.youtube.com\/watch\?v=(\S*)/;
                    return this.data_content.replace(re,'<br><iframe width="560" height="315" src="https://www.youtube.com/embed/$1"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture" allowfullscreen></iframe><br>' )
                },
                set(value){
                    this.data_content = value
                }
           }
           /*
           https://www.youtube.com/embed/
           */
    },
}
</script>
<template>
    <div class="container">
                <h1>{{title}}</h1>
                <p v-html="styled_body"></p>
                <p class="small">{{publish_date}}  <router-link :to="{name: 'authorBlog', query:{ 'author':author}}">{{author}}</router-link></p>
            </div>
</template>