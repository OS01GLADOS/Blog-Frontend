<script>
import postFullView from "./postFullView.vue"
import getCookie from "../../getCookie"

export default{
    name: 'ShowOneBlog',
    data(){
        return{
            item:{} ,
            url:"http://127.0.0.1:8000/api/posts/",
            user_id: 0,
            author_id: 0
        }
    },
    components:{
        postFullView,
        
    },
    async mounted() {
        await this.onMount()
    },
    methods:{
        getUser(){
            const token = getCookie('VueBlog')
            const requestOptions = {
                method: "GET",
                headers: {
                    'Authorization':' Bearer '+ token
                }
            }
            fetch('http://127.0.0.1:8000/api/profiles/?self=true', requestOptions)
            .then(async response =>{
                const data = await response.json()
                if (!response.ok){
                    const error = (data && data.message) || response.status
                    return Promise.reject(error)}
                return data.results[0].id

                
            })
            .catch(error => {
                this.errorMessage = error
                console.error('There was an errror!', error)
                })
        },
        async onMount(){
            
            const token = getCookie('VueBlog')
            const requestOptions = {
                method: "GET",
                headers: {
                        'Authorization':' Bearer '+ token
                        },
            }
            fetch(this.url+ this.$route.params.id, requestOptions)
                .then(async response => {
                    const data = await response.json()
                    if (!response.ok){
                            const error = (data && data.message) || response.status
                            return Promise.reject(error)
                        }
                    this.item = data
                    console.log(this.item.author_id)
                    return data.author_id
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
    <div class="mt-2">
        <router-link class="btn btn-secondary" :to="{name: 'updateBlog', params:{ id: this.$route.params.id} }">update blog</router-link>
        <router-link class="ms-3 btn btn-danger" :to="{name: 'deleteBlog', params:{ id: this.$route.params.id} }">delete blog</router-link>
        <postFullView 
            :title="item.title"
            :body="item.content"
            :author="item.author_username"
            :publish_date="item.date_posted" 
        />
    </div>
</template>

