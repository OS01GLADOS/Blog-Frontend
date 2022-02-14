<script>
import postFullView from "./postFullView.vue"
export default{
    name: 'ShowOneBlog',
    data(){
        return{
            item:{} ,
            url:"http://127.0.0.1:8000/api/posts/"
        }
    },
    components:{
        postFullView,
        
    },
    async mounted() {
        await this.onMount()
    },
    methods:{
        async onMount(){
            const requestOptions = {
                method: "GET"
            }
            fetch(this.url+ this.$route.params.id, requestOptions)
                .then(async response => {
                    const data = await response.json()
                    if (!response.ok){
                            const error = (data && data.message) || response.status
                            return Promise.reject(error)
                        }
                    this.item = data
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        },
    }
}


</script>

<template>
    <div>
        <postFullView 
            :title="item.title"
            :body="item.content"
            :author="item.author_username"
            :publish_date="item.date_posted" 
        />
    </div>
</template>