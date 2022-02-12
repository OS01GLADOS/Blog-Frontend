<script>
import postVue from "./post.vue";
export default{
    name: 'ShowOneBlog',
    data(){
        return{
            item:{"title":"not found"} ,
            url:"http://127.0.0.1:8000/api/posts/"
        }
    },
    props:['id'],
    components:{
        postVue,
        
    },
    methods:{
        async loadPost(){
            const requestOptions = {
                method: "GET"
            }

            fetch(this.url+this.id, requestOptions)
                .then(async response => {
                    const data = await response.json()
                    if (!response.ok){
                            const error = (data && data.message) || response.status
                            return Promise.reject(error)
                        }
                    this.item = data.result
                    console.log(data.result)
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        }
    }
}
</script>

<template>
    <div>
        <h1>one particular blog </h1>
        <postVue 
            :title="item.title"
            :body="item.content"
            :author="item.author_username"
            :publish_date="item.date_posted" 
        />
    </div>
</template>