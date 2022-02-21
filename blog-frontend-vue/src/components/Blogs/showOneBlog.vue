<script>
import postFullView from "./postFullView.vue"
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
        this.ifAuthor(). then(
            this.getUser()
            .then(
                this.onMount()
            )
        )
    },
    methods:{
        async ifAuthor(){
            console.log('if author')
        },
        async getUser(){
            const token = this.getCookie('VueBlog')
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
                this.user_id = data.results[0].id
                console.log (this.user_id)
                
            })
            .catch(error => {
                this.errorMessage = error
                console.error('There was an errror!', error)
                })
        },
        async onMount(){
            const token = this.getCookie('VueBlog')
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
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        },
        getCookie(cName){
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); 
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
                    })
                return res
        }
    }
}


</script>

<template>
    <div>
        <router-link :to="{name: 'updateBlog', params:{ id: this.$route.params.id} }">update blog</router-link>
        <router-link :to="{name: 'deleteBlog', params:{ id: this.$route.params.id} }">delete blog</router-link>
        <postFullView 
            :title="item.title"
            :body="item.content"
            :author="item.author_username"
            :publish_date="item.date_posted" 
        />
    </div>
</template>