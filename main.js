let app = Vue.createApp({
            
        })

        app.component('blogs-container',{
            template:`
            <h3 @load="handleClick">All blogs</h3>
            <input type="button" value="reload" @click="handleClick"/>
                <post 
                    v-for="(item, i) in items"
                    :key="i"
                    :title="item.title"
                    :body="item.content"
                    :author="item.author_username"
                />`,
            data(){
                return{
                    items:[
                       
                    ],
                    url : "http://127.0.0.1:8000/api/posts/"
                }
            },
             methods: {
                async handleClick() {
                    const requestOptions = {
                        method: "GET"
                    }

                    fetch(this.url, requestOptions)
                        .then(async response => {
                            const data = await response.json()
                            if (!response.ok) {
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
        })

        app.component('post', {
            template:`
            <div class="container">
                <h1>{{title}}</h1>
                <p>{{body}}</p>
                <p class="small"><a href="#">{{author}}</a></p>
            </div>`,
            props:['title', 'body','author']
        })
        app.mount('#app')