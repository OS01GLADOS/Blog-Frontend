<script>

import post from "@post.vue"

export default{
    template:`
    <div>
    <h3 @onload="handleClick">All blogs</h3 >
            <input type="button" value="reload" @click="handleClick"/>
                <post 
                    v-for="(item, i) in items"
                    :key="i"
                    :title="item.title"
                    :body="item.content"
                    :author="item.author_username"
                    :publish_date="item.date_posted"
                />
        </div>
            `,
            data(){
                return{
                    items:[
                    ],
                    url : "http://127.0.0.1:8000/api/posts/"
                }
            },
            components:{post},
            methods: {
                async handleClick(){
                    const requestOptions = {
                        method: "GET"
                    }

                    fetch(this.url, requestOptions)
                        .then(async response =>{
                            const data = await response.json()
                            if (!response.ok){
                                const error = (data && data.message) || response.status
                                return Promise.reject(error)
                            }
                            this.items = data.results
                            console.log(data.results)
                        })
                        .catch(error => {
                             this.errorMessage = error
                             console.error('There was an errror!', error)
                        })
                }
            },
}

</script>
    
<template>

</template>